from sqlalchemy import Column, String, Boolean, DateTime, Float, Integer, JSON
import datetime
from app.db.base import Base

class ClinicalTriageRecord(Base):
    __tablename__ = "clinical_triage_records"

    id = Column(String, primary_key=True, index=True)

    patient_id = Column(String, nullable=False, index=True)
    gestational_age_weeks = Column(Integer, nullable=True)
    systolic_bp = Column(Integer, nullable=True)
    diastolic_bp = Column(Integer, nullable=True)
    temperature_c = Column(Float, nullable=True)
    muac_cm = Column(Float, nullable=True)
    proteinuria = Column(String, nullable=True)
    m_rdt_result = Column(String, default="NOT_DONE")
    safety_tier = Column(String, default="GREEN")
    care_plan_summary = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
