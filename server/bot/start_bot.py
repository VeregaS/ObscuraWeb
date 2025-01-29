import asyncio
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums.parse_mode import ParseMode
from server.bot.middlewares.database_mw import DatabaseMiddleware
from server.bot.handlers import register_handlers
from server.bot.services.database import Database

from server.config_reader import config


async def main():

    BOT_TOKEN = config.BOT_TOKEN.get_secret_value()
    DATABASE_URL = config.DSN_LINK.get_secret_value()
    print(f"Database URL: {DATABASE_URL}")
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    db = Database(DATABASE_URL)
    dp = Dispatcher()

    await db.connect()
    dp.update.middleware(DatabaseMiddleware(db))

    register_handlers(dp)
    
    try:
        await dp.start_polling(bot)
    except Exception as e:
        print(e)
    finally:
        await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())