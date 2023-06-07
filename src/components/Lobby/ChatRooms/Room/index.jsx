import React from "react";
import styles from "./Room.module.css";
import { useNavigate } from "react-router-dom";

const Room = ({ room, setRoomInfoModalOpen }) => {
  const { roomId, roomName, curUser, maxUser, createdAt } = room;

  const getTimeDifference = (startDate, endDate) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일전`;
    } else if (hours > 0) {
      return `${hours}시간전`;
    } else if (minutes > 0) {
      return `${minutes}분전`;
    } else {
      return `${seconds}초전`;
    }
  };
  const diff = getTimeDifference(new Date(createdAt), new Date());
  const navigate = useNavigate();

  const onClick = () => {
    setRoomInfoModalOpen({ open: true, roomId: roomId });
  };

  return (
    <div
      className={styles.room}
      onDoubleClick={() => {
        navigate(`/main/${roomId}`);
      }}
    >
      <div className={styles.item}>
        <p>{roomName}</p>
      </div>
      <div className={styles.item}>
        <p>
          {curUser}/{maxUser}
        </p>
      </div>
      <div className={styles.item}>
        <p>{diff}</p>
      </div>
      <div className={styles.item}>
        <img onClick={onClick} src="/images/add_box.svg" alt="이미지박스" />
      </div>
    </div>
  );
};

export default Room;
