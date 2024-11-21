from pydantic import BaseModel
from datetime import datetime
from enum import Enum

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AppointmentUpdateDTO(BaseModel):
    description: Optional[str] = None  # O campo descrição é opcional
    date: Optional[datetime] = None    # O campo data é opcional
    status: Optional[str] = None       # O campo status é opcional
    active: Optional[bool] = None      # O campo active é opcional

    class Config:
        # Permitir que valores nulos sejam aceitos, se necessário
        orm_mode = True

class StatusEnum(str, Enum):
    COMPLETED = "concluído"
    NOT_COMPLETED = "não concluído"

class AppointmentCreate(BaseModel):
    user_id: int
    title: str
    start: datetime
    end: datetime
    description: str

class Appointment(BaseModel):
    id: int
    user_id: int
    title: str
    start: datetime
    end: datetime
    description: str
    active: bool
    status: StatusEnum

    class Config:
        from_attributes = True
