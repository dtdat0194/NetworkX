# fastapi_app/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class UserRole(str, Enum):
    CREATOR = "creator"
    SPONSOR = "sponsor"

class ContentType(str, Enum):
    VIDEO = "video"
    BLOG = "blog"
    SOCIAL_MEDIA = "social_media"
    PODCAST = "podcast"
    OTHER = "other"

class UserCreate(BaseModel):
    username: str
    password: str
    role: UserRole
    email: str
    # Common fields
    industry: str
    tags: List[str]
    
    # Creator specific fields
    content_type: Optional[ContentType] = None
    audience_size: Optional[int] = None
    content_style: Optional[str] = None
    previous_collaborations: Optional[List[str]] = None
    
    # Sponsor specific fields
    company_name: Optional[str] = None
    campaign_budget: Optional[float] = None
    target_audience: Optional[str] = None
    campaign_goals: Optional[List[str]] = None

class UserOut(BaseModel):
    id: str
    username: str
    role: UserRole
    email: str
    industry: str
    tags: List[str]
    
    # Creator specific fields
    content_type: Optional[ContentType] = None
    audience_size: Optional[int] = None
    content_style: Optional[str] = None
    previous_collaborations: Optional[List[str]] = None
    
    # Sponsor specific fields
    company_name: Optional[str] = None
    campaign_budget: Optional[float] = None
    target_audience: Optional[str] = None
    campaign_goals: Optional[List[str]] = None
    
    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str

class MatchRequest(BaseModel):
    username: str
    tags: List[str]
    role: UserRole
    industry: str
    # Additional matching criteria
    content_type: Optional[ContentType] = None
    audience_size: Optional[int] = None
    campaign_budget: Optional[float] = None
    target_audience: Optional[str] = None