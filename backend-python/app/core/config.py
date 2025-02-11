from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """Application settings."""
    
    # API Configurations
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Task Automation Assistant"
    
    # OpenAI Configuration
    OPENAI_API_KEY: str
    
    # CORS Configuration
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]  # Frontend URL
    
    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings() 