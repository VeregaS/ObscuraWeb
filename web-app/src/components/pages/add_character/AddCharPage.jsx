import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddCharPage.module.css"

function AddCharPage() {
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
    }

    const [formData, setFormData] = useState({
        name: "",
        class_: "Экзограф",
        family: "Дети магов",
        type: "Выживший",
    });
      
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://10.207.255.128:8000/api/add_character", formData);
            console.log("Успешно отправлено:", response.data);
            routeChange();
        } catch (error) {
            console.error("Ошибка:", error);
        }
        };

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
                    <input className={styles.name} name="name" value={formData.name} onChange={handleChange}></input>

                    <select className={styles.class} name="class_" value={formData.class_} onChange={handleChange}>
                        <option>Экзограф</option>
                        <option>Кинетик</option>
                        <option>Вуду</option>
                        <option>Пропащий</option>   
                        <option>Заговорщик</option>

                    </select>
                    
                    <select className={styles.family} name="family" value={formData.family} onChange={handleChange}>
                        <option>Дети магов</option>
                        <option>Военные династии</option>
                        <option>Кланы торговцев</option>
                        <option>Потомки Отшельников</option>
                        <option>Учёные Родословные</option>
                    </select>
                    
                    <select className={styles.type} name="type" value={formData.type} onChange={handleChange}>
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
                <button className={styles.buttons} onClick={handleSubmit}>Создать</button>
            </div>
            
        </div>
    );
}

export default AddCharPage;
