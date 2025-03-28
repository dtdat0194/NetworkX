# fastapi_app/main.py
from fastapi import FastAPI, HTTPException
from typing import List
from passlib.context import CryptContext
from azure.cosmos import exceptions
import schemas  # Our Pydantic models
from cosmos_db import container  # Our Cosmos DB container
from schemas import MatchRequest
app = FastAPI()

# Set up password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

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
    tags_str = ",".join(user.tags)
    new_user = {
        "id": user.username,  # Using username as the document id
        "username": user.username,
        "hashed_password": hashed_pw,
        "role": user.role,
        "tags": tags_str
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
    return {"message": "Login successful", "username": request.username}

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
    current_tags = set(match_req.tags)
    matched_users = []

    # Verify that the user exists
    try:
        container.read_item(item=username, partition_key=username)
    except exceptions.CosmosResourceNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Query for all users except the current one
    query = "SELECT * FROM c WHERE c.username != @username"
    parameters = [{"name": "@username", "value": username}]
    items = list(container.query_items(query=query, parameters=parameters, enable_cross_partition_query=True))
    
    for user in items:
        user_tags = set(user["tags"].split(",")) if user.get("tags") else set()
        if user_tags:
            # Compute the Jaccard similarity: |intersection| / |union|
            intersection = current_tags.intersection(user_tags)
            union = current_tags.union(user_tags)
            score = len(intersection) / len(union)
        else:
            score = 0
        
        # Only add users with a non-zero score (at least one overlapping tag)
        if score > 0:
            matched_users.append({"username": user["username"], "score": score})
    
    # Sort the matched users by descending similarity score
    matched_users.sort(key=lambda x: x["score"], reverse=True)
    return {"username": username, "matches": matched_users}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
