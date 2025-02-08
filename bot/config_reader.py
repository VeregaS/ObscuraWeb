from os.path import join, dirname

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    BOT_TOKEN: SecretStr
    DSN_LINK: SecretStr
    WEBAPP_LINK: str = 'https://web-rb7f9tiw9-veregas-projects.vercel.app/'
        
    model_config = SettingsConfigDict(
        env_file=join(dirname(__file__), ".env"),
        env_file_encoding="utf-8"
    )
    

config = Config()