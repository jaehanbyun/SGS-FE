import React from "react";
import styles from "./ProfileImg.module.css";
export default function ProfileImg() {
  return (
    <div className={styles.imgBox}>
      <img
        className={styles.img}
        src="/images/profile.svg"
        alt="프로필"
        fill="white"
      />
    </div>
  );
}
