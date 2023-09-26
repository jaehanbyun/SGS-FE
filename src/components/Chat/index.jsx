import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import ChatArea from "./ChatArea";
import Members from "./Members";

const Chat = ({ participants, roomId, chatList, setChatList }) => {
  return (
    <>
      <input
        className={styles.chatHiddenCheck}
        type="checkbox"
        id="chatToggle"
      />
      <label className={styles.chatCheck} htmlFor="chatToggle">
        <img src="/images/chat_drawler.svg" alt="menu" />
      </label>
      <div className={styles.chat}>
        <Members participants={participants} />
        <ChatArea
          roomId={roomId}
          chatList={chatList}
          setChatList={setChatList}
        />
      </div>
      <div className={styles.obfuscator}></div>
    </>
  );
};

export default Chat;
