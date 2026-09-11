from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.api.deps import get_db
from app.schemas.domain import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse
from app.repositories.domain import ClinicalTriageRepository
from app.services.domain import ClinicalTriageService

router = APIRouter(prefix="/clinical_triage", tags=["Clinical Decision Support"])

def get_service(db: AsyncSession = Depends(get_db)) -> ClinicalTriageService:
    repo = ClinicalTriageRepository(db)
    return ClinicalTriageService(repo)

@router.post("/evaluate", response_model=ClinicalTriageEvalResponse, status_code=status.HTTP_201_CREATED)
async def evaluate_triage(req: ClinicalTriageEvalRequest, service: ClinicalTriageService = Depends(get_service)):
    return await service.evaluate_patient_triage(req)

@router.get("/records")
async def list_records(skip: int = Query(0, ge=0), limit: int = Query(50, le=100), service: ClinicalTriageService = Depends(get_service)):
    return await service.list_patient_records(skip=skip, limit=limit)
