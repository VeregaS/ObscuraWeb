from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from bot.config_reader import config

main_page = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Открыть приложение", web_app=WebAppInfo(url=config.WEBAPP_LINK))],
])
