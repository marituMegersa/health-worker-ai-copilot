from sqlalchemy import Column, String, DateTime, Float, JSON
import datetime
from app.db.base import Base

class ClinicalTriageRecord(Base):
    __tablename__ = "clinical_triage_records"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, nullable=False, index=True)
    protocol_type = Column(String, nullable=False)
    triage_category = Column(String, nullable=False)
    gestational_age_weeks = Column(Float, nullable=True)
    systolic_bp = Column(Float, nullable=True)
    symptoms_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, index=True)
