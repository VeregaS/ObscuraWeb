import React from "react";
import { FiUsers, FiArchive, FiUser } from "react-icons/fi";
import styles from "./footer.module.css";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const match = location.pathname.match(
    /\/character\/([^/]+)|\/fractions\/([^/]+)|\/inventory\/([^/]+)|\/edit_character\/([^/]+)|\/edit_fractions\/([^/]+)/
  );
  const id = match ? match[1] || match[2] || match[3] || match[4] || match[5] : null;

  return (
    <footer>
      <div className={styles.footer}>
        <Link to={`/character/${id}`} className={styles.character}>
          <FiUser className={styles.icons} />
          <p className={styles.title}>Профиль</p>
        </Link>
        <Link to={`/fractions/${id}`} className={styles.character}>
          <FiUsers className={styles.icons} />
          <p className={styles.title}>Фракции</p>
        </Link>
        <Link to={`/inventory/${id}`} className={styles.character}>
          <FiArchive className={styles.icons} />
          <p className={styles.title}>Инвентарь</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
