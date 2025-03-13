import uvicorn
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from functions import show_characters, connect_to_db, disconnect_db

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


@app.get("/api/test")
async def test():
    return {"message": "Hello"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
