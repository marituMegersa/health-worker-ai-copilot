from typing import Dict, Any, List
import uuid
import datetime

class ClinicalTriageService:
    @staticmethod
    def evaluate_triage(data: Dict[str, Any]) -> Dict[str, Any]:
        systolic = data.get("systolic_bp", 120)
        diastolic = data.get("diastolic_bp", 80)
        is_pregnant = data.get("is_pregnant", False)
        proteinuria = data.get("proteinuria", "NEGATIVE")
        temp = data.get("temperature_c", 37.0)
        muac = data.get("muac_cm", 22.0)

        # 1. Red Emergency Pre-Eclampsia
        if is_pregnant and (systolic >= 160 or diastolic >= 110 or proteinuria in ["2+", "3+", "4+"]):
            return {
                "encounter_id": f"ENC-{uuid.uuid4().hex[:8]}",
                "safety_tier": "RED",
                "diagnosis": "Severe Pre-Eclampsia Warning",
                "care_plan": [
                    "IMMEDIATE EMERGENCY REFERRAL to Hospital Emergency Maternal Unit.",
                    "Administer Magnesium Sulfate 50% Inj loading dose (4g IV + 10g IM).",
                    "Administer oral Nifedipine 10mg immediate release for blood pressure reduction."
                ],
                "medications": [
                    {"name": "Magnesium Sulfate 50% Inj", "dosage": "4g IV + 10g IM loading dose"},
                    {"name": "Nifedipine 10mg", "dosage": "10mg orally"}
                ],
                "citation": "Ethiopian MoH Antenatal Care Guidelines Section 4.2.1 Page 58"
            }

        # 2. Red Emergency IMCI SAM / Severe Febrile Illness
        if temp >= 39.5 or (muac and muac < 11.5):
            return {
                "encounter_id": f"ENC-{uuid.uuid4().hex[:8]}",
                "safety_tier": "RED",
                "diagnosis": "Severe Pediatric Illness / SAM Complications",
                "care_plan": [
                    "IMMEDIATE EMERGENCY REFERRAL to District Hospital.",
                    "Administer pre-referral Rectal Artesunate capsule."
                ],
                "medications": [{"name": "Rectal Artesunate Capsule", "dosage": "50mg rectal dose"}],
                "citation": "Ethiopian IMCI Guidelines Section 3.1 Page 34"
            }

        return {
            "encounter_id": f"ENC-{uuid.uuid4().hex[:8]}",
            "safety_tier": "AMBER" if is_pregnant else "GREEN",
            "diagnosis": "Routine Antenatal Care Visit" if is_pregnant else "Primary Care Visit",
            "care_plan": ["Provide routine Iron + Folic Acid tablets daily", "Check EPI Immunization card"],
            "medications": [{"name": "Iron + Folic Acid", "dosage": "1 tablet daily"}],
            "citation": "Ethiopian MoH ANC Manual 2026.1"
        }
