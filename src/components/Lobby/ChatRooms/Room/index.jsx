import React from "react";
import styles from "./Room.module.css";
const Room = () => {
  return (
    <div className={styles.room}>
      <div className={styles.item}>
        <p>기말고사 시험공부</p>
      </div>
      <div className={styles.item}>
        <p>5/8</p>
      </div>
      <div className={styles.item}>
        <p>1시간전</p>
      </div>
      <div className={styles.item}>
        <img src="/images/add_box.svg" />
      </div>
    </div>
  );
};

export default Room;
