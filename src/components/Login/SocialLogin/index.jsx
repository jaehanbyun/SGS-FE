import React from "react";
import styles from "./SocialLogin.module.css";
export default function SocialLogin() {
  return (
    <>
      <div className={styles.line}></div>
      <div className={styles.mdediaOptions}>
        <div className={`${styles.field} ${styles.facebook}`}></div>
      </div>
      <div className={styles.mdediaOptions}>
        <div className={`${styles.field} ${styles.facebook}`}></div>
      </div>
    </>
  );
}
