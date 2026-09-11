from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ClinicalTriageEvalRequest(BaseModel):
    patient_id: str = Field(..., example="PAT-9842")
    protocol_type: str = Field("ANC_VISIT_2", example="ANC_VISIT_2")
    gestational_age_weeks: float = Field(..., ge=1, le=42, example=24.5)
    systolic_bp: float = Field(..., ge=70, le=240, example=142.0)
    symptoms: List[str] = Field(default_factory=list, example=["Severe headache", "Blurred vision"])

class ClinicalTriageEvalResponse(BaseModel):
    patient_id: str
    triage_category: str
    recommendation: str
    is_pre_eclampsia_risk: bool
    evidence_citations: List[str]
    evaluated_at: datetime = Field(default_factory=datetime.utcnow)
