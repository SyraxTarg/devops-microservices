"""
This file contains the fastapi main
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database.db import Base, engine
from routers import (
    genres_routes,
    movies_routes,
    preferences_routes
)


load_dotenv()


Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    os.getenv("CORS_ORIGINS")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(genres_routes.router)
app.include_router(movies_routes.router)
app.include_router(preferences_routes.router)

@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}

# Démarrage du serveur
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app",  host="localhost", port=8082, reload=True)
