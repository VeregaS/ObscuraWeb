import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddCharPage.module.css"

function AddCharPage() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Создание персонажа</h1>

            <div className={styles.input_container}>
                <div className={styles.titles}>
                    <h1 className={styles.input_tite}>Имя: </h1>
                    <h1 className={styles.input_tite}>Класс: </h1>
                    <h1 className={styles.input_tite}>Род: </h1>
                    <h1 className={styles.input_tite}>Тип: </h1>
                </div>
                <div className={styles.inputs}>
                    <input className={styles.name}></input>

                    <select className={styles.class}>
                        <option>Экзограф</option>
                        <option>Кинетик</option>
                        <option>Вуду</option>
                        <option>Пропащий</option>   
                        <option>Заговорщик</option>

                    </select>
                    
                    <select className={styles.family}>
                        <option>Дети магов</option>
                        <option>Военные династии</option>
                        <option>Кланы торговцев</option>
                        <option>Потомки Отшельников</option>
                        <option>Учёные Родословные</option>
                    </select>
                    
                    <select className={styles.type}>
                        <option>Выживший</option>
                        <option>Ремесленник</option>
                        <option>Потомок</option>
                        <option>Хранитель</option>
                        <option>Поломник</option>
                    </select>

                </div>
            </div>
    
            <div className={styles.buttons_container}>
                <button className={styles.buttons} onClick={routeChange}>Назад</button>
                <button className={styles.buttons} onClick={routeChange}>Создать</button>
            </div>
            
        </div>
    );
}

export default AddCharPage;
