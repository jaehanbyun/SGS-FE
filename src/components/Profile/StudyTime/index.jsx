import React from "react";
import styles from "./StudyTime.module.css";
export default function StudyTime({ studyTime }) {
  const hours = Math.floor(studyTime / 3600);
  const minutes = Math.floor((studyTime % 3600) / 60);
  const seconds = studyTime % 60;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return (
    <div className={styles.container}>
      <p className={styles.studyText}>총 공부 시간</p>
      <p
        className={styles.studyTime}
      >{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</p>
    </div>
  );
}
