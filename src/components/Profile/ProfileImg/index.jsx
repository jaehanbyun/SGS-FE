import React from "react";
import styles from "./ProfileImg.module.css";
export default function ProfileImg() {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src="/images/account_circle.svg"
        alt="프로필"
      />
    </div>
  );
}
