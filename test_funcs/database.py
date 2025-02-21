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


    async def add_character(self, name: str):
        async with self.pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO characters (name) VALUES ($1) ON CONFLICT DO NOTHING",
                name
            )


    async def get_character(self, id: int) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT * FROM characters WHERE id = $1", id)
        
    
    async def get_characters(self) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetch("SELECT * FROM characters ORDER BY name ASC")
        
    
    async def add_item(self, id: str, item: list):
        async with self.pool.acquire() as conn:
            items = await self.get_items(id)
            items.append(item)
            await conn.execute(
                "UPDATE characters SET inventory = $2 WHERE id = $1", id, items
            )
            
    
    async def get_items(self, id: int) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT inventory FROM characters WHERE id = $1", id)
    
    
    async def change_hp(self, id: int, new_hp: int): 
        async with self.pool.acquire() as conn:
            await conn.execute(
                "UPDATE characters SET hp= $2 WHERE id = $1", id, new_hp
            )

    
    async def load_character(self, data: list):
        name, hp, inventory = data
        async with self.pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO characters (name, hp, inventory) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
                name, hp, inventory
            )
