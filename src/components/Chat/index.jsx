import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import ChatArea from "./ChatArea";
import Members from "./Members";

const Chat = ({ participants, roomId, chatList, setChatList }) => {
  useEffect(() => {
    console.log("parti:", participants);
  }, [participants]);
  return (
    <div className={styles.container}>
      <Members participants={participants} />
      <ChatArea roomId={roomId} chatList={chatList} setChatList={setChatList} />
    </div>
  );
};

export default Chat;
