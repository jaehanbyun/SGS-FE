import React, { useEffect, useRef, useState } from "react";
import styles from "./RoomInfoModal.module.css";
import { useOnClickOutside } from "../../../hooks";
import axios from "../../../api/core";

const RoomInfoModal = ({ roomInfoModalOpen, setRoomInfoModalOpen }) => {
  const ref = useRef();
  const [roomInfo, setRoomInfo] = useState({
    channel: null,
    roomName: null,
    roomOwner: null,
    curUser: null,
    maxUser: null,
    createdAt: null,
  });

  const getRoomInfo = async () => {
    const res = await axios.get(`/room/group/${roomInfoModalOpen.roomId}`);
    let channel;
    switch (res.data.data.channel) {
      case "ELEMENTARY_SCHOOL":
        channel = "초등";
        break;
      case "MIDDLE_SCHOOL":
        channel = "중등";
        break;
      case "HIGH_SCHOOL":
        channel = "고등";
        break;
      case "UNIVERSITY":
        channel = "대학생";
        break;
      case "BUSINESS":
        channel = "취업준비";
        break;
      default:
        break;
    }
    const date = new Date(res.data.data.createdAt);
    const year = date.getFullYear(); // 년도
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
    const day = date.getDate(); // 일
    const hour = date.getHours(); // 시간
    const minute = date.getMinutes(); // 분
    const second = date.getSeconds();

    setRoomInfo({
      ...res.data.data,
      channel: channel,
      createdAt: `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`,
    });
  };

  useEffect(() => {
    getRoomInfo();
    console.log(new Date(roomInfo.createdAt));
  }, []);

  const onClick = () => {
    setRoomInfoModalOpen({ open: false });
  };

  useOnClickOutside(ref, () => {
    setRoomInfoModalOpen({ open: false });
  });

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>채팅방 정보</p>
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={styles.contents}>
            <ul>
              <li>
                <p className={styles.option}>채널</p>
                <p>{roomInfo.channel}</p>
              </li>
              <li>
                <p className={styles.option}>채팅방 제목</p>
                <p>{roomInfo.roomName}</p>
              </li>
              <li>
                <p className={styles.option}>방장</p>
                <p>{roomInfo.roomOwner}</p>
              </li>
              <li>
                <p className={styles.option}>인원</p>
                <p>
                  {roomInfo.curUser} / {roomInfo.maxUser}
                </p>
              </li>
              <li>
                <p className={styles.option}>방 생성일</p>
                <p>{roomInfo.createdAt}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoModal;
