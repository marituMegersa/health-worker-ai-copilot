from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import datetime
from app.domain.clinical_triage.models import ClinicalTriageRecord
from app.domain.clinical_triage.schemas import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse
from app.domain.clinical_triage.engine import WHOSmartGuidelinesEngine

class ClinicalTriageService:
    @staticmethod
    def evaluate_and_store(db: Session, req: ClinicalTriageEvalRequest) -> ClinicalTriageEvalResponse:
        eval_res = WHOSmartGuidelinesEngine.evaluate_anc_protocol(
            gestational_age=req.gestational_age_weeks,
            systolic_bp=req.systolic_bp,
            symptoms=req.symptoms
        )
        
        record_id = f"TRIAGE-{uuid.uuid4().hex[:8].upper()}"
        db_obj = ClinicalTriageRecord(
            id=record_id,
            patient_id=req.patient_id,
            protocol_type=req.protocol_type,
            triage_category=eval_res["triage_category"],
            gestational_age_weeks=req.gestational_age_weeks,
            systolic_bp=req.systolic_bp,
            symptoms_json={"symptoms": req.symptoms, "recommendation": eval_res["recommendation"]}
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        return ClinicalTriageEvalResponse(
            patient_id=db_obj.patient_id,
            triage_category=db_obj.triage_category,
            recommendation=eval_res["recommendation"],
            is_pre_eclampsia_risk=eval_res["is_pre_eclampsia_risk"],
            evidence_citations=eval_res["evidence_citations"],
            evaluated_at=db_obj.created_at
        )

    @staticmethod
    def list_records(db: Session, skip: int = 0, limit: int = 50) -> List[ClinicalTriageRecord]:
        return db.query(ClinicalTriageRecord).offset(skip).limit(limit).all()

    @staticmethod
    def get_record(db: Session, record_id: str) -> Optional[ClinicalTriageRecord]:
        return db.query(ClinicalTriageRecord).filter(ClinicalTriageRecord.id == record_id).first()
