import asyncio
import json
from config_reader import config
from database import Database


async def show_characters(db):
    ans = []
    characters = await db.get_characters()
    for ch in characters:
        ans.append(f'{ch["name"]} [{ch["formatted_id"]}]') 
    print(ans)
    return {"message": ans}


async def add_character(data, db):
    try:
        name, class_, family, type, attributes = data
        attributes = json.dumps(attributes)
        print(f"Добавляем персонажа: {name}, {class_}, {family}, {type}, {attributes}")
        
        await db.add_character(name, class_, family, type, attributes)
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
    