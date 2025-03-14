import asyncio
from config_reader import config
from database import Database


async def show_characters(db):
    ans = []
    characters = await db.get_characters()
    for ch in characters:
        ans.append(f'{ch["formatted_id"]} - {ch["name"]}') 
    print(ans)
    return {"message": ans}


async def add_character(data, db):
    name, class_, family, type = data.name, data.class_, data.family, data.type
    try:
        await db.add_character(name, class_, family, type)
        return {"message": f"success {data}"}
    except Exception as e:
        return {"message": f"unluck: {data} {e}"}


async def connect_to_db():
    DATABASE_URL = config.DSN_LINK.get_secret_value()
    db = Database(DATABASE_URL)
    await db.connect()
    return db


async def disconnect_db(db):
    await db.disconnect()
    