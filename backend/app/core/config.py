from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central Application Settings.
    
    Why this file exists:
    In professional software architecture (following 12-Factor App methodology),
    all environment configurations, secret keys, and runtime parameters are decoupled
    from the application logic. This allows the application to run seamlessly across
    local development, CI/CD testing, and cloud deployment environments without code changes.
    """

    APP_NAME: str = "MarketLens AI"
    APP_ENV: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "127.0.0.1"

    # LLM Settings: 'openai', 'gemini', or 'mock'
    LLM_PROVIDER: str = "mock"
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    # Database
    DATABASE_URL: str = "sqlite:///./marketlens.sqlite3"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Returns a cached singleton instance of Settings.
    lru_cache ensures the .env file is read only once instead of on every request.
    """
    return Settings()
