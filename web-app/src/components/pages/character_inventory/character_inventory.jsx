import React from "react";
// import { useEffect, useState } from "react";
// import { FiChevronLeft} from "react-icons/fi";
import { useParams } from "react-router-dom";
import styles from "./character_inventory.module.css";

function CharacterInventory() {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      
    </div>
  );
}

export default CharacterInventory;
