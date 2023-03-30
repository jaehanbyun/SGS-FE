import React from "react";
import { useSelector } from "react-redux";
import ChatRooms from "./ChatRooms";
import Collect from "./Collect";
import Home from "./Home";
import styles from "./Lobby.module.css";
import LobbyHeader from "./LobbyHeader";

const contents = [
  {
    roomId: "fdsa11",
    roomName: "중등공부할 사람",
    roomChannel: "middle",
    roomOwner: "user1",
    curUser: 2,
    maxUser: 5,
    createdAt: "2023-01-31T18:01:22.2072675",
  },
  {
    roomId: "fda111",
    roomName: "초등공부할 사람",
    roomChannel: "elemantary",
    roomOwner: "user1",
    curUser: 1,
    maxUser: 3,
    createdAt: "2023-03-30T15:01:22.2072675",
  },
  {
    roomId: "fa111",
    roomName: "수학공부",
    roomChannel: "elemantary",
    roomOwner: "user1",
    curUser: 1,
    maxUser: 3,
    createdAt: "2023-01-31T18:01:22.2072675",
  },
  {
    roomId: "dsa111",
    roomName: "과학공부할 사람",
    roomChannel: "elemantary",
    roomOwner: "user1",
    curUser: 1,
    maxUser: 3,
    createdAt: "2023-01-31T18:01:22.2072675",
  },
  {
    roomId: "fdsa11241",
    roomName: "고등공부할 사람",
    roomChannel: "high",
    roomOwner: "user1",
    curUser: 2,
    maxUser: 3,
    createdAt: "2023-01-31T18:01:22.2072675",
  },
];

const channelName = [
  "home",
  "elemantary",
  "middle",
  "high",
  "univ",
  "business",
];

const Lobby = () => {
  const { selectedChannel } = useSelector((state) => state);
  const arr = contents.filter(
    (content) => content.roomChannel === channelName[selectedChannel]
  );
  if (selectedChannel === 0) {
    return (
      <div className={styles.lobby}>
        <Home />
      </div>
    );
  } else {
    return (
      <div className={styles.lobby}>
        <LobbyHeader />
        <ChatRooms rooms={arr} />
        <Collect />
      </div>
    );
  }
};

export default Lobby;
