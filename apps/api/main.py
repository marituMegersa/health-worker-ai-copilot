from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.domain.clinical_triage.router import router as domain_router

app = FastAPI(
    title="Ethiopian Health Worker AI Copilot",
    description="Production-Grade Enterprise API Service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(domain_router)

@app.get("/")
def root_status():
    return {
        "app": "Ethiopian Health Worker AI Copilot",
        "status": "online",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }

@app.get("/healthz")
def healthcheck():
    return {"status": "OK", "uptime": "100%"}
