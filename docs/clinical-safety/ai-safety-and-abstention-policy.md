# Phase 1: AI Safety, Tri-Tier Risk Classification & Abstention Policy

**Clinical Safety Framework for Ethiopian Health Extension Workers**

---

## 1. Tri-Tier Safety Architecture Standard

The system operates strictly under a tri-tier safety classification:

```text
               Patient Presentation
                        ↓
            Clinical Rules Evaluation
                        ↓
     ┌──────────────────┼──────────────────┐
     ↓                  ↓                  ↓
  GREEN               AMBER               RED
General Info     Patient Care Plan    Emergency Referral
(Guideline Q&A)  (Human Confirmation) (Offline Deterministic Alert)
```

### Safety Tiers Breakdown

1. 🟢 **GREEN (General Information & Guidelines)**:
   - Queries regarding general protocol definitions (e.g., "What is the recommended ANC schedule?").
   - Requirement: Evidence RAG retrieval with exact document and section citations.

2. 🟡 **AMBER (Patient-Specific Care Plans)**:
   - Patient-specific treatment pathways (e.g., "Coartem dosage for 3-year-old child with mRDT+").
   - Requirement: **Structured Patient Data + Deterministic Rules + Guideline Citation + Mandatory Health Worker Confirmation Checkbox**.

3. 🔴 **RED (Emergency / Red Flag Protocols)**:
   - Life-threatening maternal or pediatric danger signs (Severe Pre-Eclampsia, SAM MUAC < 11.5cm, Lethargy/Convulsions).
   - Requirement: **Offline-first deterministic emergency alert**, pre-referral drug administration guidelines, and immediate hospital transfer dispatch.

---

## 2. AI Abstention Standard

The copilot **MUST ABSTAIN** from providing clinical care advice under the following conditions:

```text
                               AI Query
                                  ↓
       ┌──────────────────────────┴──────────────────────────┐
       │ Does the query lack vital signs / clinical data?    │ → YES → ABSTAIN
       │ Is the matching guideline expired / unverified?     │ → YES → ABSTAIN
       │ Is retrieval confidence < 80%?                       │ → YES → ABSTAIN
       │ Does query ask for autonomous doctor diagnosis?     │ → YES → ABSTAIN
       └─────────────────────────────────────────────────────┘
                                  ↓ NO
                      Proceed with CDS Evaluation
```

### Standard Abstention Response:
> *"AI Abstention: I cannot determine a safe clinical care plan from the available observations or unverified guidelines. Please conduct a full clinical examination and consult senior facility staff."*

---

## 3. Evidence Citation & Provenance Requirement

Every clinical recommendation rendered by the system **MUST** display explicit citation provenance:

```json
{
  "recommendation": "Administer Magnesium Sulfate 50% loading dose (4g IV + 10g IM)",
  "provenance": {
    "guidelineTitle": "Ethiopian National Antenatal Care Guidelines",
    "publisher": "Ethiopian Ministry of Health (MoH)",
    "version": "2026.1",
    "section": "4.2.1",
    "pageNumber": 58,
    "confidenceScore": 0.99,
    "effectiveDate": "2026-01-01"
  }
}
```

No valid citation = No clinical recommendation shown.
