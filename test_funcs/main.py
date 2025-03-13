import asyncio
from config_reader import config
from database import Database
from Functions.menu import menu


async def main():
    DATABASE_URL = config.DSN_LINK.get_secret_value()
    db = Database(DATABASE_URL)
    await db.connect()
    
    try:
        await menu(db)
    
    except Exception as e:
        print("Critical error occurred while polling: %s", e)
    
    finally:
        await db.disconnect()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Stopped.")
    except Exception as e:
        print(f"Does not start due to an error: {e}.")
