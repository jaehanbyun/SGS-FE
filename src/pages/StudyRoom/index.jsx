import React, { useEffect, useState } from "react";
import styles from "./StudyRoom.module.css";
import Video from "../../components/Video";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { disconnect, subscribe, unsubscribe } from "../../utils/stomp";
import Chat from "../../components/Chat";

const StudyRoom = () => {
  const { roomId } = useParams();
  const { selectedUserInfo } = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    subscribe(selectedUserInfo.client, roomId, setChatList);
    return () => {
      unsubscribe(selectedUserInfo.client, roomId);
      disconnect(selectedUserInfo.client);
    };
  }, []);

  return (
    <div className={styles.studyroom}>
      <Video roomId={roomId} />
      <Chat roomId={roomId} chatList={chatList} setChatList={setChatList} />
    </div>
  );
};

export default StudyRoom;
