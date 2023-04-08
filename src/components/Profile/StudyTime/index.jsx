import React from "react";
import styles from "./StudyTime.module.css";
export default function StudyTime() {
  const time = Date().split(" ");
  return (
    <div className={styles.container}>
      <p className={styles.studyText}>총 공부 시간</p>
      <p className={styles.studyTime}>{time[4]}</p>
    </div>
  );
}
