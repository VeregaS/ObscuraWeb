import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FiChevronLeft, FiEdit } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import styles from "./fractions.module.css"


function FractionsPage() {
    const location = useLocation();
    const match = location.pathname.match(/\/fractions\/([^/]+)/); // Извлекаем id из URL
    const id = match ? match[1] : null;

    return (
        <div className={styles.container}>
            <p>ХУЙ id:{id}</p>
        </div>
    );
}


export default FractionsPage;
