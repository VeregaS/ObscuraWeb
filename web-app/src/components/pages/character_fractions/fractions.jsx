import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styles from "./fractions.module.css";

function FractionsPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const match = location.pathname.match(/\/fractions\/([^/]+)/);
  const id = match ? match[1] : null;

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

  const getReputationLevel = (value) => {
    return reputationLevels.reduce((prev, curr) => (value >= curr.threshold ? curr : prev));
  };

  const ReputationBar = ({ reputation }) => {
    const minValue = -100;
    const maxValue = 100;
    const centerValue = 0;
    
    const percent = ((reputation - centerValue) / (maxValue - minValue) + 0.5) * 100;
    const level = getReputationLevel(reputation);
    const textColor = level.className;
  
    return (
      <div className={styles.reputation_container}>
        <div className={styles.reputation_bar}>
          <div className={`${styles.rep_fill} ${styles[level.className]}`} style={{ width: `${percent}%`, borderRadius: 5}}></div>
          <div className={styles.rep_marker} style={{ left: `calc(${percent}% - 6px)` }}></div>
        </div>
        <div className={`${styles.rep_label} ${styles[textColor]}`}>{level.label}</div>
      </div>
    );
  };

  const [info, setInfo] = useState(null);

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
            <div className={styles.edit}>
              <Link to={`/edit_fractions/${encodeURIComponent(id)}`} className={styles.character}>
                <p className={styles.edit_text}>Редактировать</p>
                <FiEdit className={styles.edit_icon} />
              </Link>
            </div>
          </div>
        <div className={styles.fractions}>
          <p className={styles.title}>Отношения с фракциями</p>
          {Object.entries(info).map(([key, value]) => {
            if (key !== "char_id") {
              return (
                <div key={key} className={styles.fraction}>
                  <p>{key}</p>
                  <div className={styles.reputation_controls}>
                    <ReputationBar key={key} faction={key} reputation={value}/>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default FractionsPage;
