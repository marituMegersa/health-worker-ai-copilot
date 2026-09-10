from fastapi import APIRouter
from app.domain.clinical_triage.service import *

router = APIRouter(prefix="/api/v1/clinical_triage", tags=["Health Worker AI Copilot"])

@router.get("/status")
def get_domain_status():
    return {"status": "active", "domain": "Health Worker AI Copilot"}
