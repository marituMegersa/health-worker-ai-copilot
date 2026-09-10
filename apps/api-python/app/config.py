import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Ethiopian Health Worker AI Copilot API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "copilot_user")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "copilot_secure_password")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "health_copilot_db")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    HAPI_FHIR_URL: str = os.getenv("HAPI_FHIR_URL", "http://localhost:8080/fhir")

settings = Settings()
