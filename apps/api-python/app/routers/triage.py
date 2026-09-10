from fastapi import APIRouter, HTTPException
from app.schemas.triage import PatientTriageInput, CDSEngineResult
from app.cds.engine import evaluate_python_clinical_rules

router = APIRouter(prefix="/api/v1/triage", tags=["Clinical Triage"])

@router.post("", response_model=CDSEngineResult)
async def process_clinical_triage(input_data: PatientTriageInput):
    try:
        result = evaluate_python_clinical_rules(input_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
