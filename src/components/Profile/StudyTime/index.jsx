import React from "react";
import styles from "./StudyTime.module.css";

export default function StudyTime({ studyTime }) {
  return (
    <div className={styles.container}>
      <p className={styles.studyText}>총 공부 시간</p>
      <p className={styles.studyTime}>{studyTime}</p>
    </div>
  );
}
