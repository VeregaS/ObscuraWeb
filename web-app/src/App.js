import { useEffect, useState } from "react";
import Header from "./components/blocks/header/header";
import Characters from "./components/pages/characters/Characters";
import styles from "./App.module.css";
import axios from "axios";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/my-function")
            .then(response => setData(response.data.message))
            .catch(error => console.error("Ошибка:", error));
    }, []);

    return (
        <div className={styles.App}>
            <Header title="Obscura v0.1a"/>
            <Characters/>
            <p>{data || "Загрузка..."}</p>
        </div>
    );
}

export default App;
