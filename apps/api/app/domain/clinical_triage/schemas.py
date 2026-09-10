from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ClinicalTriageRequest(BaseModel):

    patient_id: str
    gestational_age_weeks: Optional[int] = None
    systolic_bp: Optional[int] = None
    diastolic_bp: Optional[int] = None
    temperature_c: Optional[float] = None
    muac_cm: Optional[float] = None
    proteinuria: Optional[str] = "NEGATIVE"
    m_rdt_result: Optional[str] = "NOT_DONE"
    symptoms: List[str] = []


class ClinicalTriageResponse(BaseModel):
    id: str
    status: str = "COMPLETED"
    summary: str
    confidence_score: float = 0.98
    created_at: datetime

    class Config:
        from_attributes = True
