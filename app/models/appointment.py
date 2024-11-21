from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from db import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    start = Column(DateTime, index=True)
    end = Column(DateTime, index=True)
    description = Column(String, index=True)
    active = Column(Boolean, index=True, default=True)
    status = Column(String, index=True, default="não concluído")

    
