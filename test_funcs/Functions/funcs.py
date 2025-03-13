import asyncio


async def create_character(db):
    print('\n\tСоздание персонажа\n')
    name = str(input('Имя: '))
    await db.add_character(name)
    print(f'\nПерсонаж по имени {name} создан!\n')
    

async def show_characters(db):
    ans = ""
    ans += '\n\t Список персонажей\n'
    characters = await db.get_characters()
    for ch in characters:
        ans += f'{ch["formatted_id"]} - {ch["name"]}'
    ans += '\n'
    return ans


async def give_item(db):
    print('\t Выдать предмет:\n')


async def change_hp(db):
    print('\n\t Измение хп\n')
    char_id = input('Введите id персонажа: ')
    hp = int(input('На сколько изменим HP? '))
    await db.change_hp(char_id, hp)
    print('\tУспешно!\n')

