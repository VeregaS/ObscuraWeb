import React from "react";
import Header from "./components/blocks/header/header";
import Characters from "./components/pages/characters/Characters";
import styles from "./App.module.css";


function App() {
    return (
        <div className={styles.App}>
            <Header title="Obscura v0.1a"/>
            <Characters/>
        </div>
    );
}


export default App;
