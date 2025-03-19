import React from "react";
import { FiUsers } from "react-icons/fi";
import styles from "./footer.module.css"
import { Link, useLocation } from "react-router-dom";

function Footer() {
    const location = useLocation();
    const match = location.pathname.match(/\/character\/([^/]+)|\/fractions\/([^/]+)/); 
    const id = match ? match[1] || match[2] : null;

    return (
        <footer className={styles.footer}>
            <div>
                <Link to={`/fractions/${id}`} className={styles.character}>
                    <FiUsers className={styles.icons} />
                    <p className={styles.title}>Фракции</p>
                </Link>
            </div>
        </footer>
    )
}

export default Footer;