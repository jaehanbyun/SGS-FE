import React from "react";
import Button from "../../Button";
import styles from "./Collect.module.css";
import { useSelector } from "react-redux";
const Collect = ({ setModalOpen }) => {
  const { selectedChannel } = useSelector((state) => state);
  const onClick = () => {
    if (selectedChannel === 0) {
      alert("홈 채널에서는 방을 생성 할 수 없습니다.");
      return;
    }
    setModalOpen(true);
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.text}`}>
        <input type="text" maxLength={30} />
        <img src="/images/search.svg" alt="search" />
      </div>
      <div className={`${styles.item} ${styles.btn}`}>
        <Button
          text={"채팅방 생성"}
          width={"120px"}
          height={"45px"}
          backgroundColor={"#ff7272"}
          color={"#e7e7e7"}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Collect;
