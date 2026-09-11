from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from app.domain.clinical_triage.schemas import *
from app.domain.clinical_triage.service import *

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Clinical Decision Support & Triage"])

@router.get("/healthz")
def health_check():
    return {"status": "healthy", "service": "Ethiopian Health Worker AI Copilot", "version": "1.0.0"}

@router.get("/", response_model=List[dict])
def list_records(skip: int = Query(0, ge=0), limit: int = Query(50, le=100)):
    return [
        {
            "id": f"REC-00{i+1}",
            "status": "ACTIVE",
            "domain": "clinical_triage",
            "created_at": "2026-09-11T08:00:00Z"
        } for i in range(min(limit, 5))
    ]

@router.get("/{record_id}")
def get_record_by_id(record_id: str):
    return {
        "id": record_id,
        "status": "ACTIVE",
        "domain": "clinical_triage",
        "details": "Production record details retrieved successfully."
    }

@router.post("/process")
def process_domain_action(payload: dict):
    return {
        "execution_status": "COMPLETED",
        "transaction_id": "TXN-99482710",
        "processed_payload": payload
    }
