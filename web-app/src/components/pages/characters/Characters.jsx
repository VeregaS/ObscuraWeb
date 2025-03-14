import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./characters.module.css"


function Characters() {
    const [data, setData] = useState([]);
    
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/add-character-page`; 
        navigate(path);
    }

    useEffect(() => {
        axios.get("http://10.207.255.128:8000/api/show_characters")
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
            <button className={styles.buttons} onClick={routeChange} >Добавить</button>
        </div>
    );
}

export default Characters;
