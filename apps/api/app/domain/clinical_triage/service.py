from sqlalchemy.orm import Session
import uuid
import datetime
from app.domain.clinical_triage.models import ClinicalTriageRecord
from app.domain.clinical_triage.schemas import ClinicalTriageRequest

class ClinicalTriageService:
    @staticmethod
    def process_encounter(db: Session, data: ClinicalTriageRequest) -> ClinicalTriageRecord:
        rec_id = f"REC-{uuid.uuid4().hex[:8]}"
        db_obj = ClinicalTriageRecord(
            id=rec_id,
            created_at=datetime.datetime.utcnow()
        )
        return db_obj
