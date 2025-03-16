import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./character_profile.module.css"


function CharacterPage() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);


    const CATEGORIES = {
        mio: ["Выносливость", "Сноровка", "Стойкость", "Сила"],
        neuro: ["Контроль", "Авторитет", "Манипуляция", "Аналитика"],
        senso: ["Чутьё", "Реакция", "Мастерство", "Фокусировка"],
    };
    const CHARACTER_FAMILYS = {
        "Дети магов": { mio: 5, neuro: 8, senso: 7 },
        "Военные династии": { mio: 9, neuro: 4, senso: 7 },
        "Кланы торговцев": { mio: 6, neuro: 8, senso: 6 },
        "Потомки отшельников": { mio: 7, neuro: 6, senso: 7 },
        "Учёные родословные": { mio: 5, neuro: 9, senso: 6 },
    };
    const [charFamily, setCharFamily] = useState("Дети магов");
    const [points, setPoints] = useState(CHARACTER_FAMILYS[charFamily]);

    const SkillLevel = ({ level }) => {
        return (
          <div className={styles["skill-level"]}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`${styles["skill-circle"]} ${
                  i < level ? styles["filled"] : ""
                }`}
              ></div>
            ))}
          </div>
        );
    };

    useEffect(() => {
        fetch(`http://10.207.255.128:8000/api/get_character/${encodeURIComponent(id)}`)
          .then((res) => res.json())
          .then((data) => {
            setCharacter(data.message);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Ошибка:", err);
            setLoading(false);
          });
      }, [id]);
    
      if (loading) return <p>Загрузка...</p>;
      if (!character) return <p>Персонаж не найден</p>;
      console.log(character);
      const get_attributes = character['attributes'];
      const attributes = JSON.parse(get_attributes);
      const getPoints = (skillName) => {
        const skill = attributes.find(s => s.skill === skillName);
        return skill ? skill.points : null;
      };
    
    return (
        <div className={styles.container}>
            <div className={styles.up_part}>
                <div className={styles.photo}></div>
                <div className={styles.main_stats}>
                    <h1 className={styles.stats}>{character['name']}</h1>
                    <h1 className={styles.stats}>HP: {character['hp']}/{character['hp']}</h1>
                    <h1 className={styles.stats}>Что-то особое</h1>
                    <h1 className={styles.stats}>500 рублей</h1>
                </div>
            </div>

            <h1 className={styles.title}>Характеристики</h1>

            <div className={styles.levels}>
                {Object.keys(points).map((category) => (
                <div key={category}>
                    <h3 className={styles.stats_title}>{category.toUpperCase()}</h3>
                    {CATEGORIES[category].map((skill, index) => (
                    <div key={index} className={styles.skills_container}>
                        <label className={styles.skill}>
                        {skill} 
                        <br></br>
                        <SkillLevel level={getPoints(skill)} />
                        </label>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterPage;
