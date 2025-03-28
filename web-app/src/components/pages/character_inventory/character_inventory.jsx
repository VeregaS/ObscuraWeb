import React from "react";
import { useEffect, useState } from "react";
// import { FiChevronLeft} from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styles from "./character_inventory.module.css";

function CharacterInventory() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
        fetch(`http://${apiUrl}:8000/api/show_character_items/${encodeURIComponent(id)}`)
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
    return (
      <div className={styles.container}>
        <p className={styles.title}>Инвентарь</p>
        <div className={styles.inventory}>
          <p>{character}</p>
        </div>
      </div>
    );
  }
}

export default CharacterInventory;
