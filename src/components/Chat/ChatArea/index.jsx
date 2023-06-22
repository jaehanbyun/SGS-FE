import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatArea.module.css";
import { useSelector } from "react-redux";
import { publish } from "../../../utils/stomp";

const ChatArea = ({ roomId, chatList, setChatList }) => {
  const [message, setMessage] = useState("");
  const { selectedUserInfo } = useSelector((state) => state);
  const chatRef = useRef();

  useEffect(() => {
    const container = chatRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatList]);

  return (
    <div className={styles.chatArea}>
      <div ref={chatRef} className={styles.chatList}>
        <ul>
          {chatList.map((chat) => {
            if (selectedUserInfo.id === chat.senderId) {
              return (
                <div className={styles.myBox}>
                  <li className={styles.myChat} key={chat.createdAt}>
                    {chat.content}
                  </li>
                </div>
              );
            } else {
              return (
                <div className={styles.otherBox}>
                  <li className={styles.otherChat} key={chat.createdAt}>
                    {chat.content}
                  </li>
                </div>
              );
            }
          })}
        </ul>
      </div>
      <div className={styles.message}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              publish(selectedUserInfo.client, roomId, "TEXT", message);
              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatArea;
