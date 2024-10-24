from fastapi import FastAPI
from app.api import appointment, user
from .db import database, engine, Base


Base.metadata.create_all(bind=engine) 

app = FastAPI()


# Registro das rotas
app.include_router(appointment.router)
app.include_router(user.router)


@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Ponto de entrada da aplicação
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
