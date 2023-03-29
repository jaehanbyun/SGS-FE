import React from "react";
import ChatRooms from "./ChatRooms";
import styles from "./Lobby.module.css";
import LobbyHeader from "./LobbyHeader";
const Lobby = () => {
  return (
    <div className={styles.lobby}>
      <LobbyHeader />
      <ChatRooms />
    </div>
  );
};

export default Lobby;
