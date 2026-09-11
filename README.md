# Ethiopian Health Worker AI Copilot

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB.svg?style=flat&logo=python)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Offline-First AI Clinical Decision Support & WHO/MoH Guideline Assistant**

An AI-powered clinical copilot designed for healthcare workers in low-resource settings. Enforces Ethiopian Ministry of Health (MoH) and World Health Organization (WHO) maternal/child triage protocols, pre-eclampsia risk assessment, and localized clinical guidance.

---

## 🏛️ Clean Architecture Overview

This repository is built following **Clean Layered Architecture** standards:

```
apps/api/app/
├── api/          # Thin REST routers & Dependency Injection (deps.py)
├── schemas/      # Pydantic v2 validation DTOs (Request / Response)
├── models/       # SQLAlchemy 2.0 Async ORM models & Base declarative metadata
├── repositories/ # Dedicated async database access queries ONLY
├── services/     # Pure business logic, domain rules, & AI orchestrators
├── core/         # Settings (pydantic-settings), Async Database, JWT Security, & Exceptions
└── utils/        # Reusable helper utilities
```

---

## ✨ Key Features

- **Clinical Triage Engine**:  Automated pre-eclampsia risk assessment & ANC module guidance
- **Offline Sync Protocol**:  Async SQLAlchemy persistence & Redis caching for offline resilience
- **Multi-agent RAG Engine**:  LangGraph-orchestrated retrieval of WHO/MoH guidelines
- **Interactive Dashboard**:  Modern React 18 TypeScript web frontend with dynamic triage forms

---

## 🛠️ Tech Stack

- **Backend**: Python 3.12, FastAPI 0.110+, Async SQLAlchemy 2.0+, Pydantic v2
- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Database & Cache**: PostgreSQL (Asyncpg), Redis, Elasticsearch
- **AI & RAG**: vLLM / Ollama, LangChain, LangGraph State Graphs
- **DevOps & Testing**: Docker, Docker Compose, Pytest, Pytest-Asyncio

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Docker & Docker Compose
- Python 3.12+
- Node.js 20+

### 2. Backend Setup
```bash
# Navigate to API directory
cd apps/api

# Install dependencies
pip install -r requirements.txt

# Run database migrations & start FastAPI app
python main.py
# API running at http://localhost:8000 (Swagger docs at http://localhost:8000/docs)
```

### 3. Frontend Setup
```bash
# Navigate to Web app directory
cd apps/web

# Install dependencies & start dev server
npm install
npm run dev
# Web app running at http://localhost:3000
```

### 4. Running via Docker Compose
```bash
docker-compose up --build
```

---

## 🧪 Testing

Run unit & integration tests using `pytest`:
```bash
cd apps/api
pytest tests/ -v
```

---

## 📜 API Documentation

Once started, interactive API documentation is available at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

**Primary Endpoint Sample**:
`POST /api/v1/clinical_triage/evaluate`

---

## 👤 Author & Maintainer

Maintained with ❤️ by **[marituMegersa](https://github.com/marituMegersa)**.
