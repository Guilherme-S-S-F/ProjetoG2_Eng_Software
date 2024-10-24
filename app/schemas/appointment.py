from pydantic import BaseModel
from datetime import datetime

class AppointmentCreate(BaseModel):
    user_id: int
    date: datetime
    description: str

class Appointment(BaseModel):
    id: int
    user_id: int
    date: datetime
    description: str

    class Config:
        from_attributes = True
