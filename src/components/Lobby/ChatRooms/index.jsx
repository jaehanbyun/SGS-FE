import React from "react";
import styles from "./ChatRooms.module.css";
import Room from "./Room";
const ChatRooms = ({ rooms }) => {
  return (
    <div className={styles.rooms}>
      {rooms.map((room) => (
        <Room room={room} key={room.roomId} />
      ))}
    </div>
  );
};

export default ChatRooms;
