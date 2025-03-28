import React from "react";
import photo from "web-app/src/img/timeless.jpg";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiEdit } from "react-icons/fi";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "./character_profile.module.css"


function CharacterPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate(); 
  const routeChangeBack = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const CATEGORIES = {
      "МИО": ["Выносливость", "Сноровка", "Стойкость", "Сила"],
      "НЕЙРО": ["Контроль", "Авторитет", "Манипуляция", "Аналитика"],
      "СЕНСО": ["Чутьё", "Реакция", "Мастерство", "Фокусировка"],
  };
  const CHARACTER_FAMILYS = {
      "Дети магов": { "МИО": 5, "НЕЙРО": 8, "СЕНСО": 7 },
      "Военные династии": { "МИО": 9, "НЕЙРО": 4, "СЕНСО": 7 },
      "Кланы торговцев": { "МИО": 6, "НЕЙРО": 8, "СЕНСО": 6 },
      "Потомки отшельников": { "МИО": 7, "НЕЙРО": 6, "СЕНСО": 7 },
      "Учёные родословные": { "МИО": 5, "НЕЙРО": 9, "СЕНСО": 6 },
  };
  const [charFamily] = useState("Дети магов");
  const [points] = useState(CHARACTER_FAMILYS[charFamily]);

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
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
      fetch(`http://${apiUrl}:8000/api/get_character/${encodeURIComponent(id)}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setCharacter(data.message);
        })
        .catch((err) => {
          console.error("Ошибка:", err);
          setError(err);
          setLoading(false);
        });
    }, [id, apiUrl]);

  
  if (loading) {
    return (<div></div>);
  }
  else if (error) {
    return (<div> Ошибка: {error.message} </div>);
  }
  else {
    const get_attributes = character['attributes'];
    const attributes = JSON.parse(get_attributes);

    const getPoints = (skillName) => {
      const skill = attributes.find(s => s.skill === skillName);
      return skill ? skill.points : null;
    };

    return (
      <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.back_container} onClick={routeChangeBack}>
              <FiChevronLeft className={styles.icon_back}/>
              <p className={styles.back_text}>Назад</p>
            </div>
            <div className={styles.edit}>
              <Link to={`/edit_character/${encodeURIComponent(id)}`} className={styles.character}>
                <p className={styles.edit_text}>Редактировать</p>
                <FiEdit className={styles.edit_icon} />
              </Link>
            </div>
          </div>
          

          <div className={styles.up_part}>
              <img src={photo} alt="profile" className={styles.photo}/>
              <div className={styles.main_stats}>
                  <h1 className={styles.stats}>{character['name']}</h1>
                  <h1 className={styles.stats}>HP: {character['hp']} из {getPoints("Стойкость") * 10 + 5}</h1>
                  <h1 className={styles.stats}>Что-то особое</h1>
                  <h1 className={styles.stats}>{character['money']} частиц</h1>
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
}

export default CharacterPage;
