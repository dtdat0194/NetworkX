# fastapi_app/schemas.py
from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    username: str
    password: str
    role: str
    tags: List[str]

class UserOut(BaseModel):
    id: str
    username: str
    role: str
    tags: List[str]
    
    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str
    
class MatchRequest(BaseModel):
    username: str
    tags: List[str]