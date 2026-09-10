import os

class Settings:
    PROJECT_NAME: str = "Healthcare & Domain API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://copilot_user:copilot_secure_password@localhost:5432/health_copilot_db")

settings = Settings()
