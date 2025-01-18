# backend/src/config/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Whosper ASR"
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]
    
    class Config:
        case_sensitive = True