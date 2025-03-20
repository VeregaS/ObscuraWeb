import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./fractions.module.css";

function FractionsPage() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const location = useLocation();
  const match = location.pathname.match(/\/fractions\/([^/]+)/);
  const id = match ? match[1] : null;

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${apiUrl}:8000/api/get_character_reputation/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setLoading(false);
      });
  }, [apiUrl, id]);

  if (loading) return <p className={styles.back_text}>Загрузка...</p>;
  if (!info) return <p>Персонаж не найден</p>;

  return (
    <div className={styles.container}>
      <div className={styles.fractions}>
        <p className={styles.title}>Отношения с фракциями</p>
        {Object.entries(info).map(([key, value]) => {
          if (key !== "char_id") {
            return (
              <div key={key} className={styles.fraction}>
                <p>{key}</p>
                <p>{value}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FractionsPage;
