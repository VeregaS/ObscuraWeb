import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddCharPage.module.css";

function AddCharPage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

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

  const CATEGORIES = {
    МИО: ["Выносливость", "Сноровка", "Стойкость", "Сила"],
    НЕЙРО: ["Контроль", "Авторитет", "Манипуляция", "Аналитика"],
    СЕНСО: ["Чутьё", "Реакция", "Мастерство", "Фокусировка"],
  };
  const CHARACTER_FAMILYS = {
    "Дети магов": { МИО: 5, НЕЙРО: 8, СЕНСО: 7 },
    "Военные династии": { МИО: 9, НЕЙРО: 4, СЕНСО: 7 },
    "Кланы торговцев": { МИО: 6, НЕЙРО: 8, СЕНСО: 6 },
    "Потомки отшельников": { МИО: 7, НЕЙРО: 6, СЕНСО: 7 },
    "Учёные родословные": { МИО: 5, НЕЙРО: 9, СЕНСО: 6 },
  };

  const [charFamily, setCharFamily] = useState("Дети магов");
  const [points, setPoints] = useState(CHARACTER_FAMILYS[charFamily]);

  const [distribution, setDistribution] = useState({
    МИО: [0, 0, 0, 0],
    НЕЙРО: [0, 0, 0, 0],
    СЕНСО: [0, 0, 0, 0],
  });
  const handleTypeChange = (e) => {
    const newFamily = e.target.value;
    setCharFamily(newFamily);
    setPoints(CHARACTER_FAMILYS[newFamily]);
    setDistribution({
      МИО: [0, 0, 0, 0],
      НЕЙРО: [0, 0, 0, 0],
      СЕНСО: [0, 0, 0, 0],
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
    return (
      points[category] -
      distribution[category].reduce((sum, val) => sum + val, 0)
    );
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
      name: formData["name"],
      class_: formData["class_"],
      type: formData["type"],
      family: charFamily,
      attributes: Object.keys(distribution).flatMap((category) =>
        distribution[category].map((value, index) => ({
          category,
          skill: CATEGORIES[category][index],
          points: value,
        }))
      ),
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        `http://${apiUrl}:8000/api/add_character`,
        characterData
      );
      console.log(response);
      routeChange();
    } catch (error) {
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
          <input
            className={styles.name}
            name="name"
            value={formData.name}
            onChange={handleChange}
          ></input>

          <select
            className={styles.class}
            name="class_"
            value={formData.class_}
            onChange={handleChange}
          >
            <option>Экзограф</option>
            <option>Кинетик</option>
            <option>Вуду</option>
            <option>Пропащий</option>
            <option>Заговорщик</option>
          </select>

          <select
            className={styles.family}
            value={charFamily}
            onChange={handleTypeChange}
          >
            {Object.keys(CHARACTER_FAMILYS).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className={styles.type}
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
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
        <button className={styles.buttons} onClick={routeChange}>
          Назад
        </button>
        <button className={styles.buttons} onClick={handleCreateCharacter}>
          Создать
        </button>
      </div>
    </div>
  );
}

export default AddCharPage;
