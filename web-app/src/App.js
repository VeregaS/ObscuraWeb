import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/blocks/header/header";
import Characters from "./components/pages/characters/Characters";
import AddCharPage from "./components/pages/add_character/AddCharPage";
import CharacterPage from "./components/pages/character_profile/character_profile";
import EditCharacterPage from "./components/pages/edit_character/edit_character";
import Footer from "./components/blocks/footer/footer";
import FractionsPage from "./components/pages/fractions/fractions";
import CharacterInventory from "./components/pages/character_inventory/character_inventory";
import styles from "./App.module.css";

function App() {
  const location = useLocation();
  const hideFooterOn = ["/", "/add-character-page"];
  // const isFractionPage = matchPath("/fractions/:id", location.pathname);

  return (
    <div className={styles.App}>
      <Header title="Obscura v0.1a" />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/add-character-page" element={<AddCharPage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/edit_character/:id" element={<EditCharacterPage />} />
        <Route path="/fractions/:id" element={<FractionsPage />} />
        <Route path="/inventory/:id" element={<CharacterInventory />} />
      </Routes>
      {!hideFooterOn.includes(location.pathname) && (
        <Footer />
      )}
    </div>
  );
}

export default App;
