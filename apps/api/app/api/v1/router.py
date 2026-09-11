from fastapi import APIRouter
from app.api.v1.endpoints.domain import router
api_router = APIRouter(prefix='/v1')
api_router.include_router(router)
