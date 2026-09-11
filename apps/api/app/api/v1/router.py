from fastapi import APIRouter
from app.api.v1.endpoints.domain import router as domain_router
from app.api.v1.endpoints.analytics import router as analytics_router
from app.api.v1.endpoints.search import router as search_router

api_router = APIRouter(prefix="/v1")
api_router.include_router(domain_router)
api_router.include_router(analytics_router)
api_router.include_router(search_router)
