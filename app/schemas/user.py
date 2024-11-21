from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional

class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    role: Optional[str]  # Modifique conforme necessário para o tipo de role

    class Config:
        orm_mode = True

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


class LoginRequest(BaseModel):
    email: str
    password: str