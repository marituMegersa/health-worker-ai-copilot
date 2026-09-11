from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.domain.clinical_triage.schemas import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse
from app.domain.clinical_triage.service import ClinicalTriageService

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Clinical Decision Support"])

@router.post("/evaluate", response_model=ClinicalTriageEvalResponse, status_code=status.HTTP_201_CREATED)
def evaluate_triage(req: ClinicalTriageEvalRequest, db: Session = Depends(get_db)):
    return ClinicalTriageService.evaluate_and_store(db, req)

@router.get("/records")
def list_triage_records(skip: int = Query(0, ge=0), limit: int = Query(50, le=100), db: Session = Depends(get_db)):
    records = ClinicalTriageService.list_records(db, skip=skip, limit=limit)
    return [
        {
            "id": r.id,
            "patient_id": r.patient_id,
            "protocol_type": r.protocol_type,
            "triage_category": r.triage_category,
            "gestational_age_weeks": r.gestational_age_weeks,
            "systolic_bp": r.systolic_bp,
            "created_at": r.created_at
        } for r in records
    ]

@router.get("/records/{record_id}")
def get_triage_record(record_id: str, db: Session = Depends(get_db)):
    rec = ClinicalTriageService.get_record(db, record_id)
    if not rec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Triage record not found")
    return rec
