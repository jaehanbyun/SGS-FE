import React from "react";
import styles from "./ProfileInfo.module.css";
export default function ProfileInfo({ name, email }) {
  return (
    <div className={styles.info}>
      <h1 className={styles.name}>{name}</h1>
      <h2 className={styles.id}>{email}</h2>
    </div>
  );
}
