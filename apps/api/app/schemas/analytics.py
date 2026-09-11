from pydantic import BaseModel, Field
from typing import Dict, List

class TriageAnalyticsResponse(BaseModel):
    total_evaluations: int = Field(..., example=1280)
    amber_risk_count: int = Field(..., example=342)
    green_low_risk_count: int = Field(..., example=938)
    pre_eclampsia_prevalence_pct: float = Field(..., example=26.7)
    top_symptoms: Dict[str, int] = Field(..., example={"Severe headache": 210, "Blurred vision": 140})
    moh_guideline_compliance_pct: float = Field(..., example=99.4)
