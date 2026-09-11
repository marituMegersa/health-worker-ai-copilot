from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid
import datetime

from app.models.domain import ClinicalTriageRecord
from app.repositories.domain import ClinicalTriageRepository
from app.schemas.domain import ClinicalTriageEvalRequest, ClinicalTriageEvalResponse

class ClinicalTriageService:
    def __init__(self, repo: ClinicalTriageRepository):
        self.repo = repo

    async def evaluate_patient_triage(self, req: ClinicalTriageEvalRequest) -> ClinicalTriageEvalResponse:
        is_amber = req.systolic_bp >= 140 or any("headache" in s.lower() or "vision" in s.lower() for s in req.symptoms)
        category = "AMBER" if is_amber else "GREEN"
        rec = "High Pre-Eclampsia risk. Administer MgSO4 IV protocol and admit immediately." if is_amber else "Routine ANC care protocol satisfied."
        citations = ["Ethiopian MoH ANC Guidelines 2024 (Section 3.2)", "WHO SMART ANC Clinical Protocol Module 3"]

        record_id = f"TRIAGE-{uuid.uuid4().hex[:8].upper()}"
        db_obj = ClinicalTriageRecord(
            id=record_id,
            patient_id=req.patient_id,
            protocol_type=req.protocol_type,
            triage_category=category,
            gestational_age_weeks=req.gestational_age_weeks,
            systolic_bp=req.systolic_bp,
            symptoms_json={"symptoms": req.symptoms, "recommendation": rec},
            created_at=datetime.datetime.utcnow()
        )
        saved = await self.repo.create(db_obj)
        
        return ClinicalTriageEvalResponse(
            patient_id=saved.patient_id,
            triage_category=saved.triage_category,
            recommendation=rec,
            is_pre_eclampsia_risk=is_amber,
            evidence_citations=citations,
            evaluated_at=saved.created_at or datetime.datetime.utcnow()
        )

    async def list_patient_records(self, skip: int = 0, limit: int = 50) -> List[ClinicalTriageRecord]:
        return await self.repo.get_multi(skip=skip, limit=limit)
