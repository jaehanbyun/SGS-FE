import React, { useState } from "react";
import Button from "../../Button";
import styles from "./Collect.module.css";
import { useSelector } from "react-redux";
import axios from "../../../api/core";

const Collect = ({
  setNextRoomId,
  setModalOpen,
  setGroupModalOpen,
  setRooms,
  setIsScroll,
  setIsData,
  setIsSearch,
  searchValue,
  setSearchValue,
}) => {
  const { selectedChannel } = useSelector((state) => state);

  const onCreate = () => {
    if (selectedChannel === 0) {
      alert("홈 채널에서는 방을 생성 할 수 없습니다.");
      return;
    }
    setModalOpen(true);
  };

  const onJoin = () => {
    setGroupModalOpen(true);
  };

  const searchRoom = async () => {
    try {
      const res = await axios.get("/room/group", {
        params: {
          lastRoomId: 100000,
          title: searchValue,
        },
      });
      setRooms([...res.data.data]);
      setNextRoomId(res.data.data[res.data.data.length - 1].roomId);
      setIsScroll(false);
      setIsData(true);
      setIsSearch(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.text}`}>
        {selectedChannel ? null : (
          <>
            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchRoom();
                }
              }}
              value={searchValue}
              type="text"
              maxLength={30}
            />
            <img onClick={searchRoom} src="/images/search.svg" alt="search" />
          </>
        )}
      </div>
      <div className={`${styles.item} ${styles.btn}`}>
        <Button
          text={"그룹 가입"}
          width={"100px"}
          height={"45px"}
          backgroundColor={"#ff7272"}
          color={"#e7e7e7"}
          onClick={onJoin}
        />
        <Button
          text={"채팅방 생성"}
          width={"100px"}
          height={"45px"}
          backgroundColor={"#ff7272"}
          color={"#e7e7e7"}
          onClick={onCreate}
        />
      </div>
    </div>
  );
};

export default Collect;
