from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.domain.clinical_triage.schemas import ClinicalTriageRequest, ClinicalTriageResponse

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Clinical Triage & Guideline Copilot Domain"])

@router.post("/process", response_model=ClinicalTriageResponse, status_code=status.HTTP_201_CREATED)
def process_domain_request(data: ClinicalTriageRequest, db: Session = Depends(get_db)):
    return ClinicalTriageResponse(
        id="REC-8821",
        status="COMPLETED",
        summary=f"Processed {data} for Clinical Triage & Guideline Copilot",
        confidence_score=0.99,
        created_at="2026-09-10T16:00:00Z"
    )
