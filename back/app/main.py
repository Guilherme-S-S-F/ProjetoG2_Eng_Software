from fastapi import FastAPI
from api import appointment, user
from fastapi.middleware.cors import CORSMiddleware
from db import database, engine, Base

origins = [
    "http://localhost:5173",
    "http://localhost:3000",  # Endereço do seu cliente React em desenvolvimento
    "http://127.0.0.1:3000",  # Alternativa para o cliente local
    # Adicione outras origens permitidas se necessário
]

Base.metadata.create_all(bind=engine) 

app = FastAPI()


# Registro das rotas
app.include_router(appointment.router)
app.include_router(user.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
