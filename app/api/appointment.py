from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services import appointment as service_appointment
from app.schemas.appointment import Appointment, AppointmentCreate
from app.db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/appointments/", response_model=Appointment)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    return service_appointment.create(db=db, appointment=appointment)

@router.get("/appointments/{appointment_id}", response_model=Appointment)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = service_appointment.get(db, appointment_id=appointment_id)
    if db_appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return db_appointment

@router.get("/users/", response_model=list[Appointment])
def list_user(db: Session = Depends(get_db)):
    db_appointments = service_appointment.list(db)
    if db_appointments is None:
        raise HTTPException(status_code=404, detail="Users not found")
    return db_appointments