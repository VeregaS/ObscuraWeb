import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/blocks/header/header";
import Characters from "./components/pages/characters/Characters";
import AddCharPage from "./components/pages/add_character/AddCharPage";
import CharacterPage from "./components/pages/character_profile/character_profile";
import styles from "./App.module.css";


function App() {
    return (
        <div className={styles.App}>
            <Header title="Obscura v0.1a"/>
            <Routes>
                <Route path='/' element={<Characters/>} />
                <Route path='/add-character-page' element={<AddCharPage/>} />
                <Route path="/character/:id" element={<CharacterPage />} />
            </Routes>
        </div>
    );
}
    

export default App;
