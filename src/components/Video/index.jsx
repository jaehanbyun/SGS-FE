import React, { useEffect } from "react";
import styles from "./Video.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
import Participants from "./Participants";
import RoomHeader from "./RoomHeader";
import { useState } from "react";
import NoticeModal from "../Modal/NoticeModal";
import RoomInfoModal from "../Modal/RoomInfoModal";
import RoomEditModal from "../Modal/RoomEditModal";
import { useSelector } from "react-redux";

const tmp = ["참가지1", "참가자2", "참가자3"];
const Video = ({ roomId }) => {
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [roomInfoModalOpen, setRoomInfoModalOpen] = useState({
    open: false,
    roomId: null,
    roomType: true,
  });
  const [roomEditModalOpen, setRoomEditModalOpen] = useState(false);

  return (
    <div className={styles.screen}>
      <RoomHeader
        roomId={roomId}
        setRoomEditModalOpen={setRoomEditModalOpen}
        setRoomInfoModalOpen={setRoomInfoModalOpen}
        setModifyModalOpen={setModifyModalOpen}
      />
      {roomEditModalOpen && (
        <RoomEditModal
          roomId={roomId}
          setRoomEditModalOpen={setRoomEditModalOpen}
        />
      )}
      {roomInfoModalOpen.open && (
        <RoomInfoModal
          roomInfoModalOpen={roomInfoModalOpen}
          setRoomInfoModalOpen={setRoomInfoModalOpen}
        />
      )}
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
