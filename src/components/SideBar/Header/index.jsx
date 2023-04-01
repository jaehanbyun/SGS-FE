import React from "react";
import styles from "./Header.module.css";
const Header = ({ title }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
    </div>
  );
};

export default Header;
