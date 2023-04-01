import React from "react";
import styles from "./StudyTime.module.css";
export default function StudyTime() {
  const time = Date().split(" ");
  return (
    <>
      <div className={styles.studyText}>총 공부 시간</div>
      <div className={styles.studyTime}>{time[4]}</div>
    </>
  );
}
