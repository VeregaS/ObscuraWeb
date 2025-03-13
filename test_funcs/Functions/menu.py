import os
import asyncio
from .funcs import create_character, show_characters, give_item, change_hp


async def menu(db):
    os.system('cls')
    print('\n Добро пожаловать! Список команд: \n')
    
    comands_title = ["Создать персонажа", "Посмотреть персонажей", "Выдать предмет", "Изменить хп"]
    comands = {1: create_character, 2: show_characters, 3: give_item, 4: change_hp}
    
    for i in range(len(comands_title)):
        print(f' {i + 1} - {comands_title[i]}')
        
    comand = int(input('\n Выберете команду: '))
    os.system('cls')
    
    await comands[comand](db)
