import React from "react";
import styles from "./Chat.module.css";
import ChatArea from "./ChatArea";
import Members from "./Members";

const Chat = ({ roomId, chatList, setChatList }) => {
  return (
    <div className={styles.container}>
      <Members />
      <ChatArea roomId={roomId} chatList={chatList} setChatList={setChatList} />
    </div>
  );
};

export default Chat;
