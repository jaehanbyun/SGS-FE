import React from "react";
import styles from "./ProfileImg.module.css";
export default function ProfileImg({ profileImage }) {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`${profileImage}`} alt="프로필" />
    </div>
  );
}
