# fastapi_app/main.py
from fastapi import FastAPI, HTTPException
from typing import List
from passlib.context import CryptContext
from azure.cosmos import exceptions
import schemas  # Our Pydantic models
from cosmos_db import container  # Our Cosmos DB container
from schemas import MatchRequest, UserRole, ContentType

app = FastAPI(title="NetworkX - Creator-Sponsor Matching Platform")

# Set up password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def calculate_match_score(user1: dict, user2: dict) -> float:
    # Base score from tag similarity
    tags1 = set(user1.get("tags", []))
    tags2 = set(user2.get("tags", []))
    tag_score = len(tags1.intersection(tags2)) / len(tags1.union(tags2)) if tags1 or tags2 else 0
    
    # Industry match
    industry_score = 1.0 if user1.get("industry") == user2.get("industry") else 0.0
    
    # Role-specific matching
    if user1["role"] == UserRole.CREATOR and user2["role"] == UserRole.SPONSOR:
        # Check if creator's audience size meets sponsor's requirements
        audience_score = 1.0 if user1.get("audience_size", 0) >= user2.get("target_audience", 0) else 0.0
        # Check if creator's content type matches sponsor's needs
        content_score = 1.0 if user1.get("content_type") in user2.get("campaign_goals", []) else 0.0
    elif user1["role"] == UserRole.SPONSOR and user2["role"] == UserRole.CREATOR:
        # Check if sponsor's budget meets creator's requirements
        budget_score = 1.0 if user1.get("campaign_budget", 0) >= user2.get("audience_size", 0) * 0.01 else 0.0
        # Check if sponsor's target audience matches creator's audience
        audience_score = 1.0 if user1.get("target_audience") == user2.get("content_style") else 0.0
        content_score = 1.0 if user2.get("content_type") in user1.get("campaign_goals", []) else 0.0
    else:
        audience_score = 0.0
        content_score = 0.0
    
    # Calculate weighted average
    weights = {
        "tags": 0.3,
        "industry": 0.2,
        "audience": 0.3,
        "content": 0.2
    }
    
    total_score = (
        tag_score * weights["tags"] +
        industry_score * weights["industry"] +
        audience_score * weights["audience"] +
        content_score * weights["content"]
    )
    
    return total_score

# -------------------------------
# User Registration Endpoint
# -------------------------------
@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate):
    # Check if user already exists
    query = "SELECT * FROM c WHERE c.username=@username"
    parameters = [{"name": "@username", "value": user.username}]
    items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
    if items:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = get_password_hash(user.password)
    new_user = {
        "id": user.username,
        "username": user.username,
        "hashed_password": hashed_pw,
        "role": user.role,
        "email": user.email,
        "industry": user.industry,
        "tags": ",".join(user.tags),
        # Creator specific fields
        "content_type": user.content_type,
        "audience_size": user.audience_size,
        "content_style": user.content_style,
        "previous_collaborations": user.previous_collaborations,
        # Sponsor specific fields
        "company_name": user.company_name,
        "campaign_budget": user.campaign_budget,
        "target_audience": user.target_audience,
        "campaign_goals": user.campaign_goals
    }
    
    try:
        container.create_item(body=new_user)
    except exceptions.CosmosHttpResponseError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Return the user info with tags as a list
    new_user["tags"] = user.tags
    return new_user

# -------------------------------
# Login Endpoint
# -------------------------------
@app.post("/login")
def login(request: schemas.LoginRequest):
    query = "SELECT * FROM c WHERE c.username=@username"
    parameters = [{"name": "@username", "value": request.username}]
    items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
    if not items:
        raise HTTPException(status_code=404, detail="User not found")
    user = items[0]
    if not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"message": "Login successful", "username": request.username, "role": user["role"]}

# -------------------------------
# Get Profile Endpoint
# -------------------------------
@app.get("/profile/{username}", response_model=schemas.UserOut)
def get_profile(username: str):
    try:
        user = container.read_item(item=username, partition_key=username)
    except exceptions.CosmosResourceNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert tags string back to a list
    user["tags"] = user["tags"].split(",") if user.get("tags") else []
    return user

# -------------------------------
# Matching Endpoint (Simple Tag Overlap)
# -------------------------------
@app.post("/match")
def match(match_req: MatchRequest):
    username = match_req.username
    matched_users = []

    # Verify that the user exists
    try:
        current_user = container.read_item(item=username, partition_key=username)
    except exceptions.CosmosResourceNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Query for users with the opposite role
    target_role = UserRole.SPONSOR if current_user["role"] == UserRole.CREATOR else UserRole.CREATOR
    query = "SELECT * FROM c WHERE c.username != @username AND c.role = @role"
    parameters = [
        {"name": "@username", "value": username},
        {"name": "@role", "value": target_role}
    ]
    items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
    
    for user in items:
        # Convert tags string to list for matching
        user["tags"] = user["tags"].split(",") if user.get("tags") else []
        score = calculate_match_score(current_user, user)
        
        # Only add users with a non-zero score
        if score > 0:
            matched_users.append({
                "username": user["username"],
                "role": user["role"],
                "score": score,
                "industry": user.get("industry"),
                "company_name": user.get("company_name"),
                "content_type": user.get("content_type"),
                "audience_size": user.get("audience_size")
            })
    
    # Sort the matched users by descending similarity score
    matched_users.sort(key=lambda x: x["score"], reverse=True)
    return {"username": username, "matches": matched_users}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
