from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "SLC API"
    CORS_ORIGINS: list[str] = ["http://localhost:5174"]
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    DATABASE_URL: str = "postgresql+asyncpg://slc:slc-dev@localhost:5432/slc"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
