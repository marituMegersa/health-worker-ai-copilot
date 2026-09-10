# Ethiopian Health Worker AI Copilot 🩺🇪🇹

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FHIR R5](https://img.shields.io/badge/HL7_FHIR-R5-firebrick?style=for-the-badge)](https://hl7.org/fhir/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Offline-First, Multilingual, Evidence-Grounded Decision Support Platform for Ethiopian Health Workers**

Built for Health Extension Workers (HEWs), clinic nurses, midwives, and public health officers in alignment with **Ethiopian Ministry of Health (MoH) guidelines, EPHI protocols, and WHO SMART Guidelines**.

---

## 📐 Clinical Architecture

```text
Ethiopian MoH / WHO Guidelines
               ↓
  Structured Deterministic Rules (CQL / FHIR)
               ↓
    Patient Observations (FHIR)
               ↓
  Clinical Decision Support Evaluation
               ↓
  AI Explanation & RAG Retrieval (with Provenance Citations)
               ↓
   Health Extension Worker / Nurse
               ↓
   Human Clinical Decision Confirmation
```

---

## 🌟 Key Features

- **WHO SMART Guidelines & MoH Alignment**: ANC Visits 1-4, Severe Pre-Eclampsia screening, Pediatric IMCI fever/malaria workflows.
- **Tri-Tier Safety Framework**: Green (General Info RAG), Amber (Care Plan + Worker Confirmation), Red (Emergency Referral Alert).
- **Multilingual Support**: English, Amharic (አማርኛ), and Afaan Oromo.
- **Offline-First Storage**: Encrypted Room DB / SQLCipher cache with WorkManager sync queue.

---

## 📂 Monorepo Structure

```text
health-worker-ai-copilot/
├── apps/
│   ├── api/                     # Python 3.12 FastAPI Backend Application
│   │   ├── app/
│   │   │   └── domain/clinical_triage/
│   │   │       ├── models.py    # SQLAlchemy 2 ORM Models
│   │   │       ├── schemas.py   # Pydantic v2 Schemas
│   │   │       ├── service.py   # WHO/MoH Clinical Rules Service
│   │   │       └── router.py    # FastAPI APIRouter Endpoints
│   │   └── main.py
│   └── web/                     # React 18 TypeScript Frontend Application
│       ├── src/
│       │   ├── components/      # UI Triage Components & Citation Inspector
│       │   └── App.tsx
├── docker-compose.yml
└── README.md
```

---

## 🚀 Quick Start

### 1. Python FastAPI Backend (`apps/api`)
```bash
cd apps/api
pip install -r requirements.txt
python main.py
```
Open `http://localhost:8000/docs` for OpenAPI interactive documentation.

### 2. React Frontend (`apps/web`)
```bash
cd apps/web
npm install
npm run dev
```
Open `http://localhost:5173`.
