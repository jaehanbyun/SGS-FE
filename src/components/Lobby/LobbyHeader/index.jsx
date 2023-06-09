import React from "react";
import styles from "./LobbyHeader.module.css";

const LobbyHeader = ({
  scrollRef,
  setRefresh,
  setIsScroll,
  setIsData,
  setIsSearch,
  setSearchValue,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.item}>
        <p>채팅방 이름</p>
      </div>
      <div className={styles.refresh}>
        <img
          onClick={() => {
            scrollRef.current.scrollTo(0, 0);
            setRefresh((prev) => !prev);
            setIsScroll(false);
            setIsData(true);
            setIsSearch(false);
            setSearchValue("");
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
