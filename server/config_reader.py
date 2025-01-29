from os.path import join, dirname

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    BOT_TOKEN: SecretStr
    
    WEBAPP_URL: str = "https://caebdfc4fff074353b4ff972cafbae39.serveo.net"
    
    WEBHOOK_URL: str = "https://d5fce2d3759d0d670f8019dd15683818.serveo.net"
    WEBHOOK_PATH: str = "/webhook"
    
    APP_HOST: str = 'localhost'
    APP_PORT: int = 8000
    
    model_config = SettingsConfigDict(
        env_file=join(dirname(__file__), ".env"),
        env_file_encoding="utf-8"
    )
    

config = Config()