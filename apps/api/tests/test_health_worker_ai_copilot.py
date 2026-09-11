import pytest
from app.services.domain import ClinicalTriageService
from app.repositories.domain import ClinicalTriageRepository
from app.schemas.domain import ClinicalTriageEvalRequest

class MockSession:
    def add(self, obj): pass
    async def commit(self): pass
    async def refresh(self, obj): pass

@pytest.mark.asyncio
async def test_pre_eclampsia_amber_risk_triage():
    service = ClinicalTriageService(ClinicalTriageRepository(MockSession()))
    req = ClinicalTriageEvalRequest(
        patient_id="PAT-991",
        protocol_type="ANC_VISIT_2",
        gestational_age_weeks=26.0,
        systolic_bp=145.0,
        symptoms=["Severe headache"]
    )
    res = await service.evaluate_patient_triage(req)
    assert res.triage_category == "AMBER"
    assert res.is_pre_eclampsia_risk is True
    assert "MgSO4" in res.recommendation

@pytest.mark.asyncio
async def test_routine_green_triage():
    service = ClinicalTriageService(ClinicalTriageRepository(MockSession()))
    req = ClinicalTriageEvalRequest(
        patient_id="PAT-992",
        protocol_type="ANC_VISIT_1",
        gestational_age_weeks=12.0,
        systolic_bp=118.0,
        symptoms=[]
    )
    res = await service.evaluate_patient_triage(req)
    assert res.triage_category == "GREEN"
    assert res.is_pre_eclampsia_risk is False
