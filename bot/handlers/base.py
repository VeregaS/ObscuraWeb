import logging
from aiogram import Router, F
from aiogram.types import Message
from bot.keyboards.inline_keyboards import main_page

router = Router()

@router.message(F.text == "/start")
async def cmd_start(message: Message, db):
    if not db:
        logging.error("DB object is None")
        return await message.reply("Ошибка на сервере. Попробуйте позже.")
    user = await db.get_user(str(message.from_user.id))
    if not user:
        await db.add_user(str(message.from_user.id))
    else:
        await message.answer("Добро пожаловать!", reply_markup=main_page)
