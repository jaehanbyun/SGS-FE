import React from "react";
import styles from "./LobbyHeader.module.css";

const LobbyHeader = ({ setRefresh }) => {
  return (
    <div className={styles.header}>
      <div className={styles.item}>
        <p>채팅방 이름</p>
      </div>
      <div className={styles.refresh}>
        <img
          onClick={() => {
            setRefresh((prev) => !prev);
          }}
          src="/images/refresh.svg"
          alt="refresh"
        />
      </div>
      <div className={styles.item}>
        <p>입장 인원</p>
      </div>
      <div className={styles.item}>
        <p>등록된 시간</p>
      </div>
      <div className={styles.item}>
        <p>더보기</p>
      </div>
    </div>
  );
};

export default LobbyHeader;
