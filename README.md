# Ethiopian Health Worker AI Copilot 🩺🇪🇹

**Offline-First, Multilingual, Evidence-Grounded Decision Support Platform for Ethiopian Health Workers**

Built for Health Extension Workers (HEWs), clinic nurses, midwives, and public health officers in alignment with **Ethiopian Ministry of Health (MoH) guidelines, EPHI protocols, and WHO SMART Guidelines**.

---

## 📐 Central Clinical Design Architecture

```text
Ethiopian MoH / WHO Clinical Guidelines
                 ↓
   Structured Deterministic CDS Logic (CQL / FHIR)
                 ↓
       Patient Information (FHIR)
                 ↓
    Clinical Decision Support Evaluation
                 ↓
   AI Explanation & Guideline Retrieval (RAG with Citations)
                 ↓
     Health Extension Worker / Nurse
                 ↓
     Human Clinical Decision Confirmation
```

> **Safety Rule**: The AI is a decision-support system, not an autonomous physician. LLMs do not invent clinical recommendations.

---

## 🛡️ Tri-Tier Safety Framework

| Tier | Description | Protocol & Action |
| --- | --- | --- |
| 🟢 **GREEN** | General Info / Guidelines Q&A | Guideline search & RAG retrieval with mandatory citations. |
| 🟡 **AMBER** | Patient-Specific Clinical Care Plan | Structured FHIR data + Deterministic CDS Engine + Guideline Citation + **Mandatory Health Worker Confirmation**. |
| 🔴 **RED** | Emergency / Danger Sign Alert | Offline-first deterministic referral alert (e.g. Severe Pre-Eclampsia, Severe Febrile Illness / SAM) triggering immediate hospital transfer. |

---

## 🌐 Multilingual Support

Supports **English**, **Amharic (አማርኛ)**, and **Afaan Oromo**.
Clinical logic is normalized to canonical medical concepts, ensuring consistent rule evaluation across all languages.

---

## 🏛️ Ecosystem & Interoperability Architecture

```text
                  Health Worker Copilot
                            │
              ┌─────────────┴─────────────┐
              │                           │
         Clinical API                  AI API
              │                           │
              └─────────────┬─────────────┘
                            ↓
                     FHIR / HIE Layer
                            ↓
                Interoperability Layer (OpenHIM)
                   /       |       \
                  /        |        \
               eCHIS      EMR      DHIS2
                            |
                           NHDD
```

---

## 📁 Repository Structure

```text
health-worker-copilot/
├── apps/
│   ├── api/                 # Next.js / FastAPI Clinical Services
│   ├── web-admin/           # Health Worker Administration Portal
│   ├── mobile-android/      # Kotlin + Jetpack Compose Mobile App Specification
├── packages/
│   ├── fhir-profiles/       # HL7 FHIR R5 Resource Schemas (Patient, Encounter, Observation, CarePlan, AuditEvent)
│   ├── clinical-models/     # Clinical Data Structures
│   ├── terminology/         # Ethiopian NHDD & ICD-11 Mappings
├── src/
│   ├── app/
│   │   ├── analytics/       # MoH & DHIS2 Interoperability Portal
│   │   ├── patients/        # eCHIS Patient Registry & Digital Intake
│   │   ├── supplies/        # Essential Medicine Supply Chain Monitor
│   │   ├── triage/          # Interactive Multilingual Clinical Triage Assistant
│   ├── components/
│   │   └── Navbar.tsx       # Navigation bar with Language & Role Switchers
│   └── lib/
│       ├── ai/              # AI Copilot engine & RAG retriever
│       ├── clinical-rules/  # Deterministic CDS Rules Engine (CQL/FHIR)
│       ├── fhir/            # FHIR standard resource types
│       ├── i18n/            # Multilingual Dictionary (EN, AM, OM)
│       └── db.ts            # Local store & seed datasets
└── README.md
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your web browser.
