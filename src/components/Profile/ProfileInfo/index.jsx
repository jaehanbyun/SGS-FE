import React from "react";
import styles from "./ProfileInfo.module.css";
export default function ProfileInfo() {
  return (
    <div className={styles.info}>
      <h1 className={styles.name}>홍길동</h1>
      <h2 className={styles.id}>abcd1234</h2>
    </div>
  );
}
