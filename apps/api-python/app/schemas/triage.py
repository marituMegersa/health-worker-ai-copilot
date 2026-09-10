from typing import List, Optional, Literal
from pydantic import BaseModel

class VitalsInput(BaseModel):
    systolic_bp: Optional[int] = None
    diastolic_bp: Optional[int] = None
    temperature_c: Optional[float] = None
    muac_cm: Optional[float] = None
    respiratory_rate_bpm: Optional[int] = None

class LabResultsInput(BaseModel):
    m_rdt: Optional[Literal['POSITIVE', 'NEGATIVE', 'NOT_DONE']] = 'NOT_DONE'
    proteinuria_dipstick: Optional[Literal['NEGATIVE', 'TRACE', '1+', '2+', '3+', '4+']] = 'NEGATIVE'
    hemoglobin_gdl: Optional[float] = None

class PatientTriageInput(BaseModel):
    patient_id: str
    patient_name: str
    age_years: float
    gender: Literal['female', 'male']
    is_pregnant: Optional[bool] = False
    gestational_age_weeks: Optional[int] = None
    vitals: VitalsInput
    symptoms: List[str] = []
    danger_signs: List[str] = []
    lab_results: Optional[LabResultsInput] = None
    language: Optional[Literal['en', 'am', 'om']] = 'en'
    location_woreda: Optional[str] = 'Kagoro Woreda'

class MedicationDosage(BaseModel):
    name: str
    dosage: str
    notes: str

class CitationSchema(BaseModel):
    guideline_title: str
    publisher: str
    version: str
    section: str
    page_number: int
    confidence_score: float
    effective_date: str

class ReferralRequestSchema(BaseModel):
    urgency: Literal['IMMEDIATE_EMERGENCY', 'URGENT_CLINIC', 'ROUTINE']
    destination_facility_type: str
    reason_text: str

class CDSEngineResult(BaseModel):
    safety_tier: Literal['GREEN', 'AMBER', 'RED']
    title: str
    summary: str
    deterministic_care_plan: List[str]
    prescribed_medications: List[MedicationDosage]
    referral_request: Optional[ReferralRequestSchema] = None
    citation: CitationSchema
    requires_health_worker_confirmation: bool
    ai_abstention_triggered: bool
    abstention_reason: Optional[str] = None
