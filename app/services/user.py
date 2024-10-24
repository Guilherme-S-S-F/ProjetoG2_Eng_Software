from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

def create(db: Session, user: UserCreate):
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def list(db: Session):
    return db.query(User).all()
