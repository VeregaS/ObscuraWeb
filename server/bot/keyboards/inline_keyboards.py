from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

main_page = InlineKeyboardMarkup(inline_keyboard=[
    [InlineKeyboardButton(text="Открыть приложение", callback_data="open_web_app")],
])
