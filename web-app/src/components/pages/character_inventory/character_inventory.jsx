import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./character_inventory.module.css";

function CharacterInventory() {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [characterItems, setCharacterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(`http://${apiUrl}:8000/api/show_character_items/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message && Array.isArray(data.message)) {
          setCharacterItems(data.message);
        } else {
          setCharacterItems([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setError(err);
        setLoading(false);
      });
  }, [id, apiUrl]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  if (characterItems.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>Инвентарь</p>
        <p className={styles.inventory}>Пока пусто</p>
      </div>
    );
  }

  const weapons = characterItems.filter((item) => item.type === "Оружие");
  const armors = characterItems.filter((item) => item.type === "Броня");

  return (
    <div className={styles.container}>
      <p className={styles.title}>Инвентарь</p>
      
      {weapons.length > 0 && (
        <div>
          <h2 className={styles.inventory}>Оружие</h2>
          <div className={styles.inventoryList}>
            {weapons.map((weapon) => (
              <div
                key={weapon.id}
                className={styles.itemCard}
                onClick={() => setSelectedItem(weapon)}
              >
                <p>{weapon.name}</p>
                <p>Урон: {weapon.main_int.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {armors.length > 0 && (
        <div>
          <h2 className={styles.inventory}>Броня</h2>
          <div className={styles.inventoryList}>
            {armors.map((armor) => (
              <div
                key={armor.id}
                className={styles.itemCard}
                onClick={() => setSelectedItem(armor)}
              >
                <p>{armor.name}</p>
                <p>Защита: {armor.main_int.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedItem && (
        <div className={styles.modal} onClick={() => setSelectedItem(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{selectedItem.name}</h2>
            <div className={styles.modalText}>
              <p>Тип: {selectedItem.type}</p>
              <p>Свойства: {selectedItem.properties}</p>
              <p>Особые свойства: {selectedItem.special_properties}</p>
              <p>Цена: {selectedItem.price}</p>
            </div>
            <button onClick={() => setSelectedItem(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterInventory;