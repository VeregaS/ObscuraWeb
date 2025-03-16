import uvicorn
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from functions import show_characters, connect_to_db, disconnect_db, add_character, get_character

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], \
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/show_characters")
async def call_show_characters():
    db = await connect_to_db()
    try:
        return await show_characters(db)
    finally:
        await disconnect_db(db)
        
        
@app.get("/api/get_character/{id}")
async def call_get_character(id: str):
    db = await connect_to_db()
    try:
        return await get_character(id, db)
    finally:
        await disconnect_db(db)
        

@app.post("/api/add_character")
async def call_add_characters(data: dict):
    db = await connect_to_db()
    try:
        name = data['name']
        class_ = data['class_']
        family = data['family']
        type = data['type']
        attributes = data['attributes']
        hp = 5 + (attributes[2]['points'] * 10)
        
        send_data = [name, class_, family, type, attributes, hp]
        return await add_character(send_data, db)
    finally:
        await disconnect_db(db)



@app.get("/api/test")
async def test():
    return {"message": "Hello"}


if __name__ == "__main__":
    uvicorn.run(app, host="10.207.255.128", port=8000)
    # uvicorn.run(app, host="192.168.31.59", port=8000)
    
    
