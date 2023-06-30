import React from "react";
import styles from "./Video.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
import Participants from "./Participants";
import RoomHeader from "./RoomHeader";
import { useState } from "react";
import NoticeModal from "../Modal/NoticeModal";

const tmp = ["참가지1", "참가자2", "참가자3"];
const Video = ({ roomId }) => {
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  return (
    <div className={styles.screen}>
      <RoomHeader roomId={roomId} setModifyModalOpen={setModifyModalOpen} />
      {modifyModalOpen && (
        <NoticeModal roomId={roomId} setModifyModalOpen={setModifyModalOpen} />
      )}
      <div className={styles.videos}>
        <Participants participants={tmp} />
      </div>
      <MenuBar roomId={roomId} />
    </div>
  );
};

export default Video;
