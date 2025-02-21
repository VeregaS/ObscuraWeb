from os.path import join, dirname

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    DSN_LINK: SecretStr
        
    model_config = SettingsConfigDict(
        env_file=join(dirname(__file__), ".env"),
        env_file_encoding="utf-8"
    )
    

config = Config()