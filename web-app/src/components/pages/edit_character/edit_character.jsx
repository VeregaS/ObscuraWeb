import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronLeft, FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./edit_character.module.css";

function EditCharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attributes, setAttributes] = useState([]);
  const [data_save, setData] = useState({
    id: encodeURIComponent(id),
    hp: 0,
    money: 0,
    special: "",
    inventory: "Пока пусто",
  });

  let navigate = useNavigate();
  const routeChange = () => {
    navigate(`/character/${encodeURIComponent(id)}`);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const CATEGORIES = {
    "МИО": ["Выносливость", "Сноровка", "Стойкость", "Сила"],
    "НЕЙРО": ["Контроль", "Авторитет", "Манипуляция", "Аналитика"],
    "СЕНСО": ["Чутьё", "Реакция", "Мастерство", "Фокусировка"],
  };

  useEffect(() => {
    fetch(`http://${apiUrl}:8000/api/get_character/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data.message);
        setAttributes(JSON.parse(data.message.attributes));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setLoading(false);
      });
  }, [id, apiUrl]);

  useEffect(() => {
    if (character) {
      setData((prev) => ({
        ...prev,
        hp: character.hp,
        money: character.money,
        special: character.special || "",
      }));
    }
  }, [character]);

  const handleHpChange = (e) => {
    setData((prev) => ({ ...prev, hp: e.target.value }));
  };

  const handleMoneyChange = (e) => {
    setData((prev) => ({ ...prev, money: e.target.value }));
  };

  const handleSkillChange = (skill) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.skill === skill
          ? { ...attr, points: attr.points < 6 ? attr.points + 1 : 0 }
          : attr
      )
    );
  };

  const getPoints = (skillName) => {
    const skill = attributes.find(s => s.skill === skillName);
    return skill ? skill.points : null;
  };

  const handleSave = async () => {
    const characterData = {
      id: data_save.id,
      hp: data_save.hp,
      money: data_save.money,
      special: data_save.special,
      attributes: JSON.stringify(attributes),
      inventory: data_save.inventory,
    };

    try {
      console.log("Data:", characterData);
      const response = await axios.post(`http://${apiUrl}:8000/api/edit_character`, characterData);
      console.log("Успешно отправлено:", response.data);
      navigate(`/character/${encodeURIComponent(id)}`);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  if (loading) return <p className={styles.back_text}>Загрузка...</p>;
  if (!character) return <p>Персонаж не найден</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back_container} onClick={routeChange}>
          <FiChevronLeft className={styles.icon_back} />
          <p className={styles.back_text}>Назад</p>
        </div>
        <div className={styles.edit} onClick={handleSave}>
          <p className={styles.edit_text}>Сохранить</p>
          <FiEdit className={styles.edit_icon} />
        </div>
      </div>

      <div className={styles.up_part}>
        <div className={styles.photo}></div>
        <div className={styles.main_stats}>
          <h1 className={styles.stats}>{character.name}</h1>
          <h1 className={styles.stats}>
            HP: <input
              type="number"
              placeholder={character.hp}
              className={styles.edit_hp}
              value={data_save.hp}
              onChange={handleHpChange}
            />
            из {getPoints("Стойкость") * 10 + 5}
          </h1>
          <h1 className={styles.stats}>
            <input
              type="number"
              placeholder={character.money}
              className={styles.edit_money}
              value={data_save.money}
              onChange={handleMoneyChange}
            /> частиц
          </h1>
        </div>
      </div>

      <h1 className={styles.title}>Характеристики</h1>

      <div className={styles.levels}>
        {Object.keys(CATEGORIES).map((category) => (
          <div key={category}>
            <h3 className={styles.stats_title}>{category.toUpperCase()}</h3>
            {CATEGORIES[category].map((skill) => {
              const skillObj = attributes.find((attr) => attr.skill === skill) || { points: 0 };
              return (
                <div key={skill} className={styles.skills_container}>
                  <label className={styles.skill}>
                    {skill}
                    <br />
                    <div className={styles.skillLevel}>
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`${styles.circle} ${skillObj.points > i ? styles.active : ""}`}
                          onClick={() => handleSkillChange(skill)}
                        ></div>
                      ))}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditCharacterPage;
