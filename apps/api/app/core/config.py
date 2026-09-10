import os

class Settings:
    PROJECT_NAME: str = "Clinical Triage & Guideline Copilot API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://copilot_user:copilot_secure_password@localhost:5432/clinical_triage_db")

settings = Settings()
