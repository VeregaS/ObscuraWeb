import uvicorn
import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from functions import show_characters, connect_to_db, disconnect_db, add_character

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], \
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewCharData(BaseModel):
    name: str
    class_: str
    family: str
    type: str


@app.get("/api/show_characters")
async def call_show_characters():
    db = await connect_to_db()
    try:
        return await show_characters(db)
    finally:
        await disconnect_db(db)
        

@app.post("/api/add_character")
async def call_show_characters(data: NewCharData):
    db = await connect_to_db()
    try:
        return await add_character(data, db)
    finally:
        await disconnect_db(db)


@app.get("/api/test")
async def test():
    return {"message": "Hello"}


if __name__ == "__main__":
    uvicorn.run(app, host="10.207.255.128", port=8000)
    # uvicorn.run(app, host="192.168.31.59", port=8000)
    
    
