import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatRooms from "./ChatRooms";
import Collect from "./Collect";
import styles from "./Lobby.module.css";
import LobbyHeader from "./LobbyHeader";
import RoomCreateModal from "./RoomCreateModal";
import MockAdapter from "axios-mock-adapter";
import axios from "../../api/core";
import GroupJoinModal from "./GroupJoinModal";

const channelName = [
  "",
  "ELEMENTARY_SCHOOL",
  "MIDDLE_SCHOOL",
  "HIGH_SCHOOL",
  "UNIVERSITY",
  "BUSINESS",
];

const Lobby = React.memo(({ setRoomInfoModalOpen }) => {
  const { selectedChannel } = useSelector((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [nextRoomId, setNextRoomId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isData, setIsData] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const scrollRef = useRef();

  const getRooms = async () => {
    try {
      let res;
      if (selectedChannel === 0) {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: 100000,
          },
        });
      } else {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: 100000,
            channel: channelName[selectedChannel],
          },
        });
      }
      if (res.status === 204) {
        setRooms([]);
        return;
      }
      setRooms([...res.data.data]);
      setNextRoomId(res.data.data[res.data.data.length - 1].roomId);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    getRooms();
    scrollRef.current.scrollTo(0, 0);
    setIsScroll(false);
    setIsData(true);
    setIsSearch(false);
    setSearchValue("");
  }, [selectedChannel, refresh]);
  return (
    <div className={styles.lobby}>
      <LobbyHeader setRefresh={setRefresh} />
      <ChatRooms
        scrollRef={scrollRef}
        rooms={rooms}
        setRooms={setRooms}
        nextRoomId={nextRoomId}
        setNextRoomId={setNextRoomId}
        setRoomInfoModalOpen={setRoomInfoModalOpen}
        isScroll={isScroll}
        setIsScroll={setIsScroll}
        isData={isData}
        setIsData={setIsData}
        isSearch={isSearch}
        searchValue={searchValue}
      />
      <Collect
        setModalOpen={setModalOpen}
        setGroupModalOpen={setGroupModalOpen}
        setRooms={setRooms}
        setNextRoomId={setNextRoomId}
        setIsScroll={setIsScroll}
        setIsData={setIsData}
        setIsSearch={setIsSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {groupModalOpen && (
        <GroupJoinModal setGroupModalOpen={setGroupModalOpen} />
      )}
      {modalOpen && <RoomCreateModal setModalOpen={setModalOpen} />}
    </div>
  );
});

export default Lobby;
