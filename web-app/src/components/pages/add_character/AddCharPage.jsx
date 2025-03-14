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

    
    const CHARACTER_FAMILYS = {
        "Дети магов": { mio: 5, neuro: 8, senso: 7 },
        "Военные династии": { mio: 9, neuro: 4, senso: 7 },
        "Кланы торговцев": { mio: 6, neuro: 8, senso: 6 },
        "Потомки отшельников": { mio: 7, neuro: 6, senso: 7 },
        "Учёные родословные": { mio: 5, neuro: 9, senso: 6 },
        };
        
    const CATEGORIES = {
    mio: ["Выносливость", "Сноровка", "Стойкость", "Сила"],
    neuro: ["Контроль", "Авторитет", "Манипуляция", "Аналитика"],
    senso: ["Чутьё", "Реакция", "Мастерство", "Фокусировка"],
    };

    const [charFamily, setCharFamily] = useState("Дети магов");
    const [points, setPoints] = useState(CHARACTER_FAMILYS[charFamily]);
    const [distribution, setDistribution] = useState({
        mio: [0, 0, 0, 0],
        neuro: [0, 0, 0, 0],
        senso: [0, 0, 0, 0],
    });
    
    const handleTypeChange = (e) => {
        const newFamily = e.target.value;
        setCharFamily(newFamily);
        setPoints(CHARACTER_FAMILYS[newFamily]);
        setDistribution({
        mio: [0, 0, 0, 0],
        neuro: [0, 0, 0, 0],
        senso: [0, 0, 0, 0],
        });
    };

    const handlePointChange = (category, index, value) => {
        const totalAssigned = distribution[category].reduce(
          (sum, val) => sum + val,
          0
        );
        const remainingPoints =
          points[category] - totalAssigned + distribution[category][index];
    
        if (value >= 0 && value <= 6 && remainingPoints >= value) {
          const newDist = {
            ...distribution,
            [category]: [...distribution[category]],
          };
          newDist[category][index] = value;
          setDistribution(newDist);
        }
      };

    const calculateRemainingPoints = (category) => {
        return points[category] - distribution[category].reduce((sum, val) => sum + val, 0);
    };

    const handleCreateCharacter = async () => {
        const totalSpent = Object.keys(distribution).reduce(
            (sum, category) =>
            sum + distribution[category].reduce((subSum, val) => subSum + val, 0),
            0
        );
        const totalAvailable = Object.values(points).reduce(
            (sum, val) => sum + val,
            0
        );
        if (totalSpent !== totalAvailable) {
            alert("Распределите все очки перед созданием персонажа!");
            return;
        }

        const characterData = {
            name: formData['name'],
            class_: formData['class_'],
            type: formData['type'],
            family: charFamily,
            attributes: Object.keys(distribution).flatMap((category) =>
                distribution[category].map((value, index) => ({
                    category,
                    skill: CATEGORIES[category][index],
                    points: value,
                }))
            ),
        };

        console.log("📝 Данные персонажа:", characterData);
        try {
            const response = await axios.post("http://10.207.255.128:8000/api/add_character", characterData);
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
                    
                        <select className={styles.family} value={charFamily} onChange={handleTypeChange}>
                            {Object.keys(CHARACTER_FAMILYS).map((type) => (
                                <option key={type} value={type}>
                                {type}
                                </option>
                            ))}
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
            

            <div className={styles.stats}>
                {Object.keys(points).map((category) => (
                <div key={category} className={styles.stat}>
                    <h3 className={styles.stats_title}>
                    {category.toUpperCase()} ({calculateRemainingPoints(category)})
                    </h3>
                    {CATEGORIES[category].map((skill, index) => (
                    <div key={index}>
                        <label className={styles.stat_title}>
                        {skill} 
                        <br></br>
                        <input
                            className={styles.num_stat}
                            type="number"
                            value={distribution[category][index]}
                            onChange={(e) =>
                                handlePointChange(category, index, Number(e.target.value))
                            }
                            min="0"
                            max="6"
                        />
                        </label>
                    </div>
                    ))}
                </div>
                ))}
            </div>
    
            <div className={styles.buttons_container}>
                <button className={styles.buttons} onClick={routeChange}>Назад</button>
                <button className={styles.buttons} onClick={handleCreateCharacter}>Создать</button>
            </div>
            
        </div>
    );
}

export default AddCharPage;
