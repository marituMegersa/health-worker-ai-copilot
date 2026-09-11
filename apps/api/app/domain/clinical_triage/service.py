from typing import Dict, Any
from app.domain.clinical_triage.engine import WHOSmartGuidelinesEngine
from app.domain.clinical_triage.schemas import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse

class ClinicalTriageService:
    @staticmethod
    def process_triage(req: ClinicalTriageEvalRequest) -> ClinicalTriageEvalResponse:
        res = WHOSmartGuidelinesEngine.evaluate_anc_protocol(
            gestational_age=req.gestational_age_weeks,
            systolic_bp=req.systolic_bp,
            symptoms=req.symptoms
        )
        return ClinicalTriageEvalResponse(
            patient_id=req.patient_id,
            triage_category=res["triage_category"],
            recommendation=res["recommendation"],
            is_pre_eclampsia_risk=res["is_pre_eclampsia_risk"],
            evidence_citations=res["evidence_citations"]
        )
