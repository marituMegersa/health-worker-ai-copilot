from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.domain.clinical_triage.router import router as domain_router

app = FastAPI(title="health-worker-ai-copilot API", description="Python FastAPI Backend for health-worker-ai-copilot", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(domain_router)

@app.get("/health")
def health():
    return {"status": "healthy", "service": "health-worker-ai-copilot"}
