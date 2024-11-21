from sqlalchemy.orm import Session
from models.appointment import Appointment
from schemas.appointment import AppointmentCreate, AppointmentUpdateDTO

def create(db: Session, appointment: AppointmentCreate):
    db_appointment = Appointment(**appointment.model_dump())
    db_appointment.status = "não concluído"
    db_appointment.active = True
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def get(db: Session, appointment_id: int):
    return db.query(Appointment).filter(Appointment.id == appointment_id).first()

def list(db: Session):
    return db.query(Appointment).all()

def delete(db: Session, appointment_id: int):
    db.query(Appointment).filter(Appointment.id == appointment_id).delete()
    return db.commit()

def update(db: Session, appointment_id: int, appointment_update: AppointmentUpdateDTO):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    
    if db_appointment:
        # Atualiza os campos do agendamento com os valores fornecidos no DTO
        if appointment_update.description is not None:
            db_appointment.description = appointment_update.description
        if appointment_update.date is not None:
            db_appointment.date = appointment_update.date
        if appointment_update.status is not None:
            db_appointment.status = appointment_update.status
        if appointment_update.active is not None:
            db_appointment.active = appointment_update.active
        
        db.commit()
        db.refresh(db_appointment)
        return db_appointment
    
    return None

