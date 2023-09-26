import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatArea.module.css";
import { useSelector } from "react-redux";
import { publish } from "../../../utils/stomp";

const ChatArea = React.memo(({ roomId, chatList, setChatList }) => {
  const selectedUserInfo = useSelector((state) => state.selectedUserInfo);

  const [message, setMessage] = useState("");

  const chatRef = useRef();

  useEffect(() => {
    const container = chatRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatList]);

  return (
    <div className={styles.chatArea}>
      <div ref={chatRef} className={styles.chatList}>
        <ul>
          {chatList.map((chat, index) => {
            const hour =
              chat.createdAt[3] > 12
                ? `오후 ${chat.createdAt[3] - 12}`
                : `오전 ${chat.createdAt[3]}`;
            const minute =
              chat.createdAt[4] < 10
                ? `0${chat.createdAt[4]}`
                : chat.createdAt[4];
            console.log("chat");
            if (selectedUserInfo.id === chat.senderId) {
              return (
                <div className={styles.myBox} key={chat.createdAt}>
                  <li
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.myChat}
                  >
                    {chat.content}
                  </li>
                  <p className={styles.myTime}>
                    {hour}:{minute}
                  </p>
                </div>
              );
            } else {
              return (
                <div className={styles.otherBox} key={chat.createdAt}>
                  <li
                    style={{ whiteSpace: "pre-line" }}
                    className={styles.otherChat}
                  >
                    {chat.content}
                  </li>
                  <p className={styles.otherTime}>
                    {hour}:{minute}
                  </p>
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
              if (message === "") {
                return;
              }
              publish(selectedUserInfo.client, roomId, "TEXT", message);
              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
});

export default ChatArea;
