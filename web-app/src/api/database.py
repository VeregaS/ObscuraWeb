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


    async def add_character(self, name: str, class_: str, family: str, type: str, attributes: list, hp: int):
        async with self.pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO characters (name, class, family, type, attributes, hp) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING",
                name, class_, family, type, attributes, hp
            )


    async def get_character(self, id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT * FROM characters WHERE formatted_id = $1", id)
        
    
    async def get_characters(self) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetch("SELECT * FROM characters ORDER BY name ASC")
        
    
    async def add_item(self, id: str, item: list):
        async with self.pool.acquire() as conn:
            items = await self.get_items(id)
            items.append(item)
            await conn.execute(
                "UPDATE characters SET inventory = $2 WHERE formatted_id = $1", id, items
            )
            
    
    async def get_items(self, id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT inventory FROM characters WHERE formatted_id = $1", id)
    
    
    async def change_hp(self, id: str, new_hp: int):
        hp = await self.get_hp(id)
        new_hp = hp + new_hp 
        async with self.pool.acquire() as conn:
            await conn.execute(
                "UPDATE characters SET hp= $2 WHERE formatted_id = $1", id, new_hp
            )

    
    async def get_hp(self, id: str) -> int:
        async with self.pool.acquire() as conn:
            return await conn.fetchval("SELECT hp FROM characters WHERE formatted_id = $1", id)
        
    
    async def load_character(self, data: list):
        name, hp, inventory = data
        async with self.pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO characters (name, hp, inventory) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
                name, hp, inventory
            )
    
    
    async def edit_character(self, data: list):
        id, hp, money, special, attributes = data
        async with self.pool.acquire() as conn:
            await conn.execute(
                "UPDATE characters SET (hp, money, special, attributes) = ($2, $3, $4, $5) WHERE formatted_id = $1",
                id, int(hp), int(money), str(special), attributes
            )


    async def get_character_reputation(self, id: str) -> Optional[dict]:
        async with self.pool.acquire() as conn:
            return await conn.fetchrow("SELECT * FROM factions WHERE char_id = $1", id)
    
    
    async def edit_character_reputation(self, data: list):
        char_id, fr1, fr2, fr3, fr4, fr5 = data
        async with self.pool.acquire() as conn:
            await conn.execute(
                '''
                UPDATE factions 
                SET "Союз Забвения" = $2, 
                    "Доминион Иллюзий" = $3, 
                    "Кланы Завершения" = $4, 
                    "Острова Тишины" = $5, 
                    "Конфедерация Света" = $6 
                WHERE char_id = $1
                ''',
                str(char_id), int(fr1), int(fr2), int(fr3), int(fr4), int(fr5)
            )
    
        
    async def get_character_items(self, id: str) -> dict:
        async with self.pool.acquire() as conn:
            items = await conn.fetch(
                '''
                SELECT i.* 
                FROM items i
                JOIN character_items ci ON i.id = ANY(ci.item_id)
                WHERE ci.character_id = $1;
                ''', id
            )  
            return [dict(item) for item in items]
        
            
    # UPDATE character_items
    # SET item_id = item_id || ARRAY[3], 
    #     quantity = quantity || ARRAY[1]
    # WHERE character_id = '#0032';
    
    # SELECT i.* FROM items i
    # JOIN character_items ci ON i.id = ci.item_id
    # WHERE ci.character_id = '#000001';
