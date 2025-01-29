import asyncpg
from typing import Optional

class Database:
    def __init__(self, dsn: str):
        self.dsn = dsn
        self.pool: Optional[asyncpg.Pool] = None


    async def connect(self):
        self.pool = await asyncpg.create_pool(self.dsn)


    async def disconnect(self):
        if self.pool:
            await self.pool.close()


    async def add_user(self, user_id: str):
        async with self.pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO users (id) VALUES ($1) ON CONFLICT DO NOTHING",
                user_id
            )


    async def get_user(self, user_id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT * FROM users WHERE id = $1", user_id)
    