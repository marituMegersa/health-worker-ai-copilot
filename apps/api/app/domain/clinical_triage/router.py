from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_async_db
from app.domain.clinical_triage.service import ClinicalTriageLangGraphService

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Ethiopian Health Worker AI Copilot"])

@router.get("/healthz")
async def async_health_check():
    return {"status": "healthy", "architecture": "Async SQLAlchemy + LangGraph + Redis + Elasticsearch"}

@router.post("/agentic-eval")
async def run_agentic_eval(payload: dict, db: AsyncSession = Depends(get_async_db)):
    return await ClinicalTriageLangGraphService.evaluate_async(db, payload)
