from typing import Dict, Any, List

class WHOSmartGuidelinesEngine:
    @staticmethod
    def evaluate_anc_protocol(gestational_age: float, systolic_bp: float, symptoms: List[str]) -> Dict[str, Any]:
        has_headache = any("headache" in s.lower() for s in symptoms)
        has_epigastric = any("epigastric" in s.lower() for s in symptoms)
        
        is_pre_eclampsia = systolic_bp >= 140 or (systolic_bp >= 130 and (has_headache or has_epigastric))
        
        if is_pre_eclampsia:
            category = "AMBER"
            recommendation = "High risk for Severe Pre-Eclampsia. Administer initial dose of Magnesium Sulfate (MgSO4) 4g IV, schedule immediate referral to zonal hospital."
            citations = [
                "Ethiopian MoH Antenatal Care Guidelines (2024), Sec 4.2: Hypertensive Disorders",
                "WHO SMART ANC Guidelines Module 3: Management of Preeclampsia"
            ]
        else:
            category = "GREEN"
            recommendation = "Routine ANC Visit protocol: Administer Iron (60mg) + Folic Acid (400mcg) daily, check hemoglobin level, schedule next visit in 4 weeks."
            citations = [
                "Ethiopian MoH ANC Clinical Protocols, ANC Visit 2 Schedule",
                "WHO Recommendations on Antenatal Care for a Positive Pregnancy Experience (2020)"
            ]
            
        return {
            "triage_category": category,
            "recommendation": recommendation,
            "is_pre_eclampsia_risk": is_pre_eclampsia,
            "evidence_citations": citations
        }
