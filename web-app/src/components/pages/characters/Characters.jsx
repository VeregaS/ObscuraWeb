import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./characters.module.css"

function Characters() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/show_characters")
            .then(response => setData(response.data.message))
            .catch(error => console.error("Ошибка:", error));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список персонажей:</h1>
            {data.length > 0 ? (
                <ul className={styles.list}>
                    {data.map((char, index) => (
                        <li key={index}>{char}</li>
                    ))}
                </ul>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
}

export default Characters;
