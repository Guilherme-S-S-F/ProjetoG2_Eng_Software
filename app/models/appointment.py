from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.db import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime, index=True)
    description = Column(String, index=True)
