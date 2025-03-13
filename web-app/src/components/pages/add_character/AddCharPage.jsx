import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddCharPage.module.css"

function AddCharPage() {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Хуууууууууууууууууй</h1>
            <button className={styles.addbutton} onClick={routeChange}>Назад</button>
            
        </div>
    );
}

export default AddCharPage;
