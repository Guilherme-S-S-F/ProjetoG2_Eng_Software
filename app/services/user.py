from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.criptography import hash_password, verify_password

def create(db: Session, user: UserCreate):
    db_user = User(**user.model_dump())
    db_user.password = hash_password(db_user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def list(db: Session):
    return db.query(User).all()

def login(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if verify_password(password, user.password):
        return user
    return None