import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatRooms from "./ChatRooms";
import Collect from "./Collect";
import styles from "./Lobby.module.css";
import LobbyHeader from "./LobbyHeader";
import RoomCreateModal from "./RoomCreateModal";
import axios from "../../api/core";

const channelName = [
  "",
  "ELEMENTARY_SCHOOL",
  "MIDDLE_SCHOOL",
  "HIGH_SCHOOL",
  "UNIVERSITY",
  "BUSINESS",
];

const Lobby = React.memo(({ signaling }) => {
  const { selectedChannel } = useSelector((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [lastRoomId, setLastRoomId] = useState(100000);
  const [nextRoomId, setNextRoomId] = useState(null);
  const arr = rooms.filter(
    (content) => content.roomChannel === channelName[selectedChannel]
  );
  const getRooms = async () => {
    try {
      let res;
      if (selectedChannel === 0) {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: lastRoomId,
          },
        });
      } else {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: lastRoomId,
            channel: channelName[selectedChannel],
          },
        });
      }
      if (res.status == 204) {
        setRooms([]);
        return;
      }
      // console.log(res);
      setRooms([...res.data.data]);
      setNextRoomId(res.data.data[res.data.data.length - 1].roomId);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    getRooms();
  }, [selectedChannel]);
  return (
    <div className={styles.lobby}>
      <LobbyHeader />
      <ChatRooms
        signaling={signaling}
        rooms={rooms}
        setRooms={setRooms}
        nextRoomId={nextRoomId}
        setNextRoomId={setNextRoomId}
      />
      <Collect setModalOpen={setModalOpen} />
      {modalOpen && (
        <RoomCreateModal signaling={signaling} setModalOpen={setModalOpen} />
      )}
    </div>
  );
});

export default Lobby;
