import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styles from "./fractions_edit.module.css";

function FractionsEditPage() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  let navigate = useNavigate();

  const reputationLevels = [
    { threshold: -70, className: "rep_hate", label: "Ненависть" },
    { threshold: -60, className: "rep_hostile", label: "Враждебность" },
    { threshold: -10, className: "rep_feew", label: "Неприязнь" },
    { threshold: 0, className: "rep_neutral", label: "Равнодушие" },
    { threshold: 10, className: "rep_friendly", label: "Дружелюбие" },
    { threshold: 40, className: "rep_honored", label: "Уважение" },
    { threshold: 60, className: "rep_revered", label: "Почтение" },
    { threshold: 90, className: "rep_exalted", label: "Превознесение" },
  ];

  useEffect(() => {
    fetch(`http://${apiUrl}:8000/api/get_character_reputation/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setError(err);
        setLoading(false);
      });
  }, [apiUrl, id]);

  const updateReputation = (faction, change) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [faction]: Math.max(-95, Math.min(100, prevInfo[faction] + change)),
    }));
  };

  const saveReputation = async () => {
    try {
      const response = await axios.post(`http://${apiUrl}:8000/api/edit_character_reputation`, info);
      console.log("Успешно отправлено:", response.data);
      navigate(`/fractions/${encodeURIComponent(id)}`);
    } catch (error) {
      setError(error);
      console.error("Ошибка:", error);
    }
  };

  const ReputationBar = ({ reputation, rep_key }) => {
    const minValue = -100;
    const maxValue = 100;
    const barWidth = "calc(100% - 60px)"; 
    const percent = (reputation - minValue) / (maxValue - minValue);
    const barFillWidth = `calc(${percent} * 100%)`; 
    const adjustedLeft = `calc(${percent} * ${barWidth} + 30px - 4px)`;
    const level = reputationLevels.reduce((prev, curr) => (reputation >= curr.threshold ? curr : prev));
    
    return (
      <div className={styles.reputation_container}>
        <div className={styles.reputation_controls}>
          <button onClick={() => updateReputation(rep_key, -5)} className={styles.edit_button}>-</button>
          <div className={styles.reputation_bar}>
            <div className={`${styles.rep_fill} ${styles[level.className]}`} style={{ width: barFillWidth }}></div>
            <div className={styles.rep_marker} style={{ left: adjustedLeft }}></div>
          </div>
          <button onClick={() => updateReputation(rep_key, 5)} className={styles.edit_button}>+</button>
        </div>
        <div className={`${styles.rep_label} ${styles[level.className]}`}>{level.label}</div>
      </div>
    );
  };

  if (loading) {
    return(<div></div>);
  }
  else if (error) {
    return(<div> Ошибка: {error.message} </div>);
  }
  else {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.edit} onClick={saveReputation}>
            <p className={styles.edit_text}>Сохранить</p> 
            <FiEdit className={styles.edit_icon} />
          </div>
        </div>
        <div className={styles.fractions}>
          <p className={styles.title}>Отношения с фракциями</p>
          {Object.entries(info).map(([key, value]) => (
            key !== "char_id" && (
              <div key={key} className={styles.fraction}>
                <p>{key}</p>
                <div className={styles.reputation_controls}>
                  <ReputationBar reputation={value} rep_key={key} />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  }
}

export default FractionsEditPage;