import React from "react";
import styles from "./characters.module.css"

class Characters extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>Персонажи</div>
            </div>
        )
    }
}

export default Characters