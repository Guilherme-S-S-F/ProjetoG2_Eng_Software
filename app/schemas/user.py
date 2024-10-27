from pydantic import BaseModel
from enum import Enum

class RoleEnum(str, Enum):
    ADMIN = "admin"
    CLIENT = "client"

class UserCreate(BaseModel):
    name: str
    email: str
    role: RoleEnum
    password: str
    phone: str

class UserResponse(BaseModel):
    id: int
    name: str
    role: RoleEnum
    email: str
    phone: str

    class Config:
        from_attributes = True    

class User(BaseModel):
    id: int
    name: str
    password: str
    role: RoleEnum
    email: str
    phone: str

    class Config:
        from_attributes = True
