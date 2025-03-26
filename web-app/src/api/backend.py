import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from functions import show_characters, connect_to_db, disconnect_db, add_character, \
    get_character, edit_character, get_character_reputation
from config_reader import config
from database import Database

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], \
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
HOST = config.HOST.get_secret_value()
DATABASE_URL = config.DSN_LINK.get_secret_value()
db = Database(DATABASE_URL)


@app.on_event("startup")
async def startup():
    await db.connect()
    
@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
    
def get_db():
    return db


@app.get("/api/show_characters")
async def call_show_characters(db: Database = Depends(get_db)):
    return await show_characters(db)
        
        
@app.get("/api/get_character/{id}")
async def call_get_character(id: str, db: Database = Depends(get_db)):
    return await get_character(id, db)


@app.get("/api/get_character_reputation/{id}")
async def call_get_character_reputation(id: str, db: Database = Depends(get_db)):
    return await get_character_reputation(id, db)


@app.post("/api/add_character")
async def call_add_characters(data: dict, db: Database = Depends(get_db)):
    name = data['name']
    class_ = data['class_']
    family = data['family']
    type = data['type']
    attributes = data['attributes']
    hp = 5 + (attributes[2]['points'] * 10)
    
    send_data = [name, class_, family, type, attributes, hp]
    return await add_character(send_data, db)
        
        
@app.post('/api/edit_character')
async def call_edit_character(data: dict, db: Database = Depends(get_db)):
    id = "#" + str(data['id'])
    hp = data['hp']
    money = data['money']
    special = data['special']
    attributes = data['attributes']
    inventory = data['inventory']
    
    send_data = [id, hp, money, special, attributes, inventory]
    return await edit_character(send_data, db)



@app.get("/api/test")
async def test():
    return {"message": "Hello"}


if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=8000)
