import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], \
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def my_function():
    return {"message": "Hello, this is my function result!"}

@app.get("/api/my-function")
def call_my_function():
    return my_function()


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
