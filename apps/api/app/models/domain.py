from sqlalchemy import Column, String, DateTime, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from app.core.database import Base

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    region = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Facility(Base):
    __tablename__ = "facilities"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    facility_type = Column(String, nullable=False)
    organization_id = Column(String, ForeignKey("organizations.id"), nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

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
