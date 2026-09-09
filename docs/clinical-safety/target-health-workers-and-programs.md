# Phase 1: Target Health Workers, Programs & Clinical Governance Board

**Health Worker AI Copilot — Ethiopian Ministry of Health Specification**

---

## 1. Target Health Worker Personas & Scope

In accordance with Phase 1 of the implementation roadmap, the primary target users for Version 1 are frontline healthcare professionals operating in Ethiopian primary care facilities and community posts:

| Target User Persona | Operational Setting | Scope of Clinical Assistance |
| --- | --- | --- |
| **Health Extension Workers (HEWs)** | Health Posts (Kebele level), Community Outreach, Household Visits | WHO IMCI triage, MUAC malnutrition screening, basic ANC screening, vaccine tracking, emergency red-flag referral. |
| **Clinic Nurses** | Primary Health Care Units (PHCUs), Health Centers | Antenatal Care (ANC 1-4), malaria mRDT diagnostics, acute watery diarrhea Plan B rehydration, dosage lookup. |
| **Midwives** | Health Center Maternity Units | Severe pre-eclampsia screening, Magnesium Sulfate pre-referral protocol, labor monitoring, postnatal care (PNC). |
| **Health Officers** | Woreda Health Centers & Primary Hospitals | Complex differential diagnosis support, referral acceptance, clinical audit review. |

---

## 2. Initial Clinical Target Programs

Version 1 is explicitly scoped to **six core primary care programs**:

1. **Antenatal Care (ANC)**: Guided visit protocols (ANC 1-4), BP tracking, proteinuria dipstick evaluation, Iron/Folic acid prophylaxis.
2. **Maternal Danger-Sign Screening**: Severe pre-eclampsia/eclampsia identification, vaginal bleeding, severe headache, emergency referral dispatch.
3. **Child Health (IMCI)**: Integrated Management of Newborn and Childhood Illness (IMCI)—pediatric fever/malaria, acute watery diarrhea ORS/Zinc protocols, SAM MUAC screening.
4. **EPI Immunization**: Routine vaccination schedule tracking (BCG, Penta, Rotavirus, Measles) and follow-up reminders.
5. **Postnatal Care (PNC)**: Maternal postpartum hemorrhage screening, neonatal danger signs, infection checks.
6. **Emergency Referral Workflows**: Pre-referral emergency drug administration (Rectal Artesunate, Nifedipine, MgSO4) and facility transfer notes.

---

## 3. Clinical Governance Board & Review Protocol

A **Clinical Governance Board** must be established to oversee guideline validation and AI safety.

### Board Composition
- **2 Senior Ethiopian Obstetrician-Gynecologists** (MoH / EPHI advisory panel)
- **2 Pediatricians** (IMCI specialist group)
- **2 Health Extension Program Directors**
- **1 Digital Health & Informatics Officer** (eCHIS team representative)

### Governance Review Workflow
```text
MoH Guideline Published
          ↓
Clinical Governance Board Review
          ↓
Deterministic CQL Rules Extraction
          ↓
Multi-Clinician Validation & Sign-off
          ↓
Approved Registry Entry (Published Status)
          ↓
Deployed to Copilot Guideline Cache
```
