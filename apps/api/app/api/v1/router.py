from fastapi import APIRouter
from app.api.v1.endpoints import domain

api_router = APIRouter(prefix="/v1")
api_router.include_router(domain.router)
