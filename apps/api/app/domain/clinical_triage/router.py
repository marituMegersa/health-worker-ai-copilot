from fastapi import APIRouter, HTTPException, status
from typing import List
from app.domain.clinical_triage.schemas import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse
from app.domain.clinical_triage.service import ClinicalTriageService

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Clinical Decision Support"])

@router.post("/evaluate", response_model=ClinicalTriageEvalResponse)
def evaluate_triage(req: ClinicalTriageEvalRequest):
    return ClinicalTriageService.process_triage(req)

@router.get("/protocols")
def get_supported_protocols():
    return {
        "supported_protocols": ["ANC_VISIT_1", "ANC_VISIT_2", "PRE_ECLAMPSIA_SCREENING", "PEDIATRIC_IMCI_FEVER"],
        "guideline_version": "Ethiopian MoH 2024 & WHO SMART Guidelines R5"
    }
