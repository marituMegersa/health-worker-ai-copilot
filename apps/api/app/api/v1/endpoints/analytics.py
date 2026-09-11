from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.repositories.domain import ClinicalTriageRepository
from app.schemas.analytics import TriageAnalyticsResponse
from app.services.analytics import TriageAnalyticsService

router = APIRouter(prefix="/analytics", tags=["Clinical Analytics"])

@router.get("", response_model=TriageAnalyticsResponse)
async def get_analytics(db: AsyncSession = Depends(get_db)):
    repo = ClinicalTriageRepository(db)
    service = TriageAnalyticsService(repo)
    return await service.get_triage_analytics()
