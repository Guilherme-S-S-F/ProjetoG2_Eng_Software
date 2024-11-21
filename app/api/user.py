from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services import user as service_user
from schemas.user import LoginRequest, UserCreate, UserResponse, UserUpdate
from db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/user/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return service_user.create(db=db, user=user)

@router.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = service_user.get(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/users/", response_model=list[UserResponse])
def list_user(db: Session = Depends(get_db)):
    db_users = service_user.list(db)
    if db_users is None:
        raise HTTPException(status_code=404, detail="Users not found")
    return db_users


@router.post("/users/login", response_model=UserResponse)
def login(data:LoginRequest, db: Session = Depends(get_db)):
    print(data)
    user_logged = service_user.login(db, data.email, data.password)
    if user_logged is None:
        raise HTTPException(status_code=403, detail="Email ou senha estão errados")
    
    return user_logged


@router.put("/user/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = service_user.get(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = service_user.update(db=db, user_id=user_id, user_update=user_update)
    return updated_user


@router.delete("/user/{user_id}")
def delete(user_id: int, db: Session = Depends(get_db)):
    service_user.delete(db, user_id)