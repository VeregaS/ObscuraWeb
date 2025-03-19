import React from "react";
import styles from "./header.module.css";

class Header extends React.Component {
  render() {
    return <header className={styles.header}>{this.props.title}</header>;
  }
}

export default Header;
