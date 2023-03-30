import React from "react";
import Button from "../../Button";
import styles from "./Collect.module.css";
const Collect = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.text}`}>
        <input type="text" maxLength={30} />
        <img src="/images/search.svg" alt="search" />
      </div>
      <div className={`${styles.item} ${styles.btn}`}>
        <Button
          text={"채팅방 생성"}
          width={120}
          height={45}
          backgroundColor={"#ff7272"}
          color={"#fff"}
        />
      </div>
    </div>
  );
};

export default Collect;
