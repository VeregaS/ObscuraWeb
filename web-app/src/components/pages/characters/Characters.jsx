import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        axios.get(`http://${process.env.REACT_APP_API_URL}:8000/api/show_characters`)
            .then(response => setData(response.data.message))
            .catch(error => console.error("Ошибка:", error));
    }, []);
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список персонажей:</h1>
            {data.length > 0 ? (
                <ul className={styles.list}>
                    {data.map((char, index) => (
                        <Link 
                            key={char[1]}
                            to={`/character/${char[1].replace('#', '')}`} 
                            className={styles.character}
                        >
                            <li>[{char[1]}] {char[0]}</li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p className={styles.list}>Загрузка...</p>
            )}
            <button className={styles.buttons} onClick={routeChange} >Добавить</button>
        </div>
    );
}

export default Characters;
