from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Enterprise Clean Architecture API Engine"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "production"
    SECRET_KEY: str = "supersecretproductionkey1234567890qwertyuiop"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    ALGORITHM: str = "HS256"
    
    DATABASE_URL: str = "sqlite:///./production.db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:80"
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
