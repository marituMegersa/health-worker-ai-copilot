def test_clinical_triage_model_instantiation():
    from app.domain.clinical_triage.models import ClinicalTriageRecord
    rec = ClinicalTriageRecord(id="REC-TEST-01")
    assert rec.id == "REC-TEST-01"

def test_clinical_triage_schema_validation():
    from app.domain.clinical_triage.schemas import ClinicalTriageResponse
    res = ClinicalTriageResponse(id="REC-TEST-01", status="COMPLETED", summary="Test", confidence_score=0.99, created_at="2026-09-10T16:00:00Z")
    assert res.status == "COMPLETED"
