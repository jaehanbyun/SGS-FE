import React, { useRef } from "react";
import styles from "./RoomHeader.module.css";
import Button from "../../Button";
import axios from "../../../api/core";

const RoomHeader = ({ roomId, setModifyModalOpen }) => {
  const noticeRef = useRef();

  const toggleNotice = () => {
    noticeRef.current.classList.toggle(styles.hide);
  };

  const createCode = async () => {
    try {
      console.log(roomId);
      const res = await axios.patch("room/group/private", {
        roomId: roomId,
      });
      console.log(res);
      alert(`초대코드는 ${res.data.data.roomCode} 입니다.`);
    } catch (err) {
      console.log(err);
    }
  };

  const modifyNotice = () => {
    setModifyModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>제목{roomId}</p>
        <div>
          <Button
            text={"공지사항"}
            fontsize={"12"}
            width={"90px"}
            height={"30px"}
            backgroundColor={"#ff7272"}
            color={"#fff"}
            onClick={toggleNotice}
          />
        </div>
        <div>
          <Button
            text={"초대코드 생성"}
            fontsize={"12"}
            width={"90px"}
            height={"30px"}
            backgroundColor={"#ff7272"}
            color={"#fff"}
            onClick={createCode}
          />
        </div>
      </div>
      <div ref={noticeRef} className={`${styles.notice} ${styles.hide}`}>
        <p>공지사항입니다.</p>
        <Button
          text={"공지사항 수정"}
          fontsize={"12"}
          width={"90px"}
          height={"30px"}
          backgroundColor={"#ff7272"}
          color={"#fff"}
          onClick={modifyNotice}
        />
      </div>
    </div>
  );
};

export default RoomHeader;
