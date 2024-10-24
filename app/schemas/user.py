from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str

class User(BaseModel):
    id: int
    name: str
    email: str
    phone: str

    class Config:
        from_attributes = True
