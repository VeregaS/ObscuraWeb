import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums.parse_mode import ParseMode
from bot.middlewares.logging_setup import setup_logging 
from bot.middlewares.database_mw import DatabaseMiddleware
from bot.handlers import register_handlers
from bot.services.database import Database

from bot.config_reader import config


async def main():
    setup_logging()
    
    BOT_TOKEN = config.BOT_TOKEN.get_secret_value()
    if not BOT_TOKEN:
        logging.critical("BOT_TOKEN not found in environment variables!")
        return
    
    DATABASE_URL = config.DSN_LINK.get_secret_value()
    if not DATABASE_URL:
        logging.critical("DATABASE_URL not found in environment variables!")
        return
    
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    db = Database(DATABASE_URL)
    dp = Dispatcher()

    await db.connect()
    dp.update.middleware(DatabaseMiddleware(db))
    logging.info("Database connection established.")
    
    register_handlers(dp)
    logging.info("Bot successfully started. Start polling...")
    
    try:
        await dp.start_polling(bot)
    except Exception as e:
        logging.exception("Critical error occurred while polling: %s", e)
    finally:
        await db.disconnect()
        logging.info("Database connection closed.")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logging.info("Bot stopped.")
    except Exception as e:
        logging.critical(f"Bot does not start due to an error: {e}.")