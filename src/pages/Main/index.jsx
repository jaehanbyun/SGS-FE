import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../../components/Modal/CalendarModal";
import ChartModal from "../../components/Modal/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import styles from "./Main.module.css";
import LogOutModal from "../../components/Modal/LogOutModal";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";
import { connect, subscribe, unsubscribe } from "../../utils/stomp";
import RoomInfoModal from "../../components/Modal/RoomInfoModal";

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [roomInfoModalOpen, setRoomInfoModalOpen] = useState({
    open: false,
    roomId: null,
    roomType: true,
  });
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserInfo } = useSelector((state) => state);

  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  var client = null;

  useEffect(() => {
    client = connect(client);
    dispatch(setSelectedUserInfo({ ...selectedUserInfo, client: client }));
    setUpdate((prev) => !prev);
    return () => {
      if (client.connected) {
        unsubscribe(client, 0);
      }
    };
  }, []);

  return (
    <div className={styles.main}>
      <Lobby setRoomInfoModalOpen={setRoomInfoModalOpen} />
      {roomInfoModalOpen.open && (
        <RoomInfoModal
          setRoomInfoModalOpen={setRoomInfoModalOpen}
          roomInfoModalOpen={roomInfoModalOpen}
        />
      )}
      <Profile setProfileModalOpen={setProfileModalOpen} update={update} />
      {profileModalOpen && (
        <ProfileEditModal
          setProfileModalOpen={setProfileModalOpen}
          setUpdate={setUpdate}
        />
      )}
      {selectedProfileIcon[0] && <CalendarModal />}
      {selectedProfileIcon[1] && <ChartModal />}
      {selectedProfileIcon[3] && <LogOutModal />}
    </div>
  );
};

export default Main;
