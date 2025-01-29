from aiogram import BaseMiddleware
from typing import Callable, Any, Dict


class DatabaseMiddleware(BaseMiddleware):
    def __init__(self, db):
        super().__init__()
        self.db = db

    async def __call__(self, handler: Callable, event: Any, data: Dict):
        if not self.db:
            raise RuntimeError("Database connection is None!")
        data["db"] = self.db
        return await handler(event, data)
