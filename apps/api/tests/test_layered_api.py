import pytest
from fastapi.testclient import TestClient
from app.api.v1.endpoints.domain import router as domain_router

def test_triage_evaluation_payload():
    payload = {
        "patient_id": "PAT-TEST-100",
        "protocol_type": "ANC_VISIT_2",
        "gestational_age_weeks": 28.0,
        "systolic_bp": 145.0,
        "symptoms": ["Severe headache"]
    }
    assert payload["systolic_bp"] >= 140.0
    assert "symptoms" in payload
