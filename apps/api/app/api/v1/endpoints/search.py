from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.api.deps import get_db
from app.repositories.domain import ClinicalTriageRepository
from app.schemas.search import PaginatedTriageResponse, ClinicalTriageEvalResponse

router = APIRouter(prefix="/search", tags=["Search & Filter"])

@router.get("", response_model=PaginatedTriageResponse)
async def search_records(
    category: Optional[str] = Query(None),
    min_bp: Optional[float] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    repo = ClinicalTriageRepository(db)
    all_recs = await repo.get_multi(skip=(page - 1) * page_size, limit=page_size)
    items = [
        ClinicalTriageEvalResponse(
            patient_id=r.patient_id,
            triage_category=r.triage_category,
            recommendation="Protocol guidance matched.",
            is_pre_eclampsia_risk=r.triage_category == "AMBER",
            evidence_citations=["Ethiopian MoH Guideline"],
            evaluated_at=r.created_at
        ) for r in all_recs
    ]
    return PaginatedTriageResponse(
        items=items,
        total=len(items),
        page=page,
        page_size=page_size,
        total_pages=1
    )
