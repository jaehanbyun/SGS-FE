import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatRooms from "./ChatRooms";
import Collect from "./Collect";
import styles from "./Lobby.module.css";
import LobbyHeader from "./LobbyHeader";
import RoomCreateModal from "./RoomCreateModal";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const channelName = ["", "elemantary", "middle", "high", "univ", "business"];

const Lobby = React.memo(() => {
  const { selectedChannel } = useSelector((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const arr = rooms.filter(
    (content) => content.roomChannel === channelName[selectedChannel]
  );
  const getRooms = async () => {
    try {
      const res = await axios.get("/room/group");
      setRooms([...res.data]);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    const mock = new MockAdapter(axios);
    mock.onGet("/room/group").reply((config) => {
      return [
        200,
        [
          {
            roomId: "fdsa11",
            roomName: "중등공부할 사람",
            roomChannel: "middle",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 5,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "fda111",
            roomName: "초등공부할 사람",
            roomChannel: "elemantary",
            roomOwner: "user1",
            curUser: 1,
            maxUser: 3,
            createdAt: "2023-03-30T15:01:22.2072675",
          },
          {
            roomId: "fa111",
            roomName: "수학공부",
            roomChannel: "elemantary",
            roomOwner: "user1",
            curUser: 1,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "dsa111",
            roomName: "과학공부할 사람",
            roomChannel: "elemantary",
            roomOwner: "user1",
            curUser: 1,
            maxUser: 3,
            createdAt: "2023-04-01T13:01:22.2072675",
          },
          {
            roomId: "100",
            roomName: "univ",
            roomChannel: "univ",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "101",
            roomName: "business",
            roomChannel: "business",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "102",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "103",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "104",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "105",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "106",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "107",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
          {
            roomId: "108",
            roomName: "고등공부할 사람",
            roomChannel: "high",
            roomOwner: "user1",
            curUser: 2,
            maxUser: 3,
            createdAt: "2023-01-31T18:01:22.2072675",
          },
        ],
      ];
    });
    getRooms();
  }, [selectedChannel]);
  return (
    <div className={styles.lobby}>
      <LobbyHeader />
      {selectedChannel ? (
        <ChatRooms rooms={rooms} setRooms={setRooms} />
      ) : (
        <ChatRooms rooms={rooms} setRooms={setRooms} />
      )}
      <Collect setModalOpen={setModalOpen} />
      {modalOpen && <RoomCreateModal setModalOpen={setModalOpen} />}
    </div>
  );
});

export default Lobby;
