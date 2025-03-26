import json
from config_reader import config
from database import Database


async def show_characters(db):
    ans = []
    characters = await db.get_characters()
    for ch in characters:
        ans.append([ch["name"], ch["formatted_id"]]) 
    return {"message": ans}


async def get_character(id, db):
    new_id = f"#{id}"
    character = await db.get_character(new_id)
    return {"message": character}


async def get_character_reputation(id, db):
    new_id = f"#{id}"
    data = await db.get_character_reputation(new_id)
    return {"message": data}


async def edit_character(data, db):
    character = await db.edit_character(data)
    return {"message": character}


async def add_character(data, db):
    try:
        name, class_, family, type, attributes, hp = data
        attributes = json.dumps(attributes)
        await db.add_character(name, class_, family, type, attributes, hp)
        return {"message": f"success {data}"}
    except Exception as e:
        return {"message": f"unluck: {data} {e}"}
    