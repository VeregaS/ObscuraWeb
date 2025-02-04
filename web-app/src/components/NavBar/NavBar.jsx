import React from "react";
import { ReactComponent as PersonsSVG } from "web-app/src/assets/icon-group.svg";
import { ReactComponent as DiceSVG } from "web-app/src/assets/icon-dice.svg";
import styles from "./NavBar.module.css"


const NavBar = ({is_visible}) => {
    <div className={styles.navbar}>
        <PersonsSVG className={styles.persons} />
        <DiceSVG className={styles.dice} />
    </div>
};

export default NavBar;