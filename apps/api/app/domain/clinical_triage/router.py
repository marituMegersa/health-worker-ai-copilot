from fastapi import APIRouter, status
from pydantic import BaseModel
from typing import List, Optional
from app.domain.clinical_triage.service import ClinicalTriageService

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Clinical Triage"])

class TriageInput(BaseModel):
    patient_id: str
    systolic_bp: Optional[int] = 120
    diastolic_bp: Optional[int] = 80
    is_pregnant: Optional[bool] = False
    proteinuria: Optional[str] = "NEGATIVE"
    temperature_c: Optional[float] = 37.0
    muac_cm: Optional[float] = 22.0

@router.post("/evaluate", status_code=status.HTTP_200_OK)
def evaluate_triage(data: TriageInput):
    return ClinicalTriageService.evaluate_triage(data.dict())
