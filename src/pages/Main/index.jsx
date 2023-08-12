import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../../components/Modal/CalendarModal";
import ChartModal from "../../components/Modal/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import styles from "./Main.module.css";
import LogOutModal from "../../components/Modal/LogOutModal";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";
import { connect, unsubscribe } from "../../utils/stomp";
import RoomInfoModal from "../../components/Modal/RoomInfoModal";

const Main = ({ signaling }) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [roomInfoModalOpen, setRoomInfoModalOpen] = useState({
    open: false,
    roomId: null,
  });
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserInfo } = useSelector((state) => state);

  const dispatch = useDispatch();
  var client = null;
  useEffect(() => {
    signaling.uid = selectedUserInfo.id;

    client = connect(client);
    dispatch(setSelectedUserInfo({ ...selectedUserInfo, client }));

    return () => {
      if (client.connected) {
        unsubscribe(client, 0);
      }
    };
  }, []);

  return (
    <div className={styles.main}>
      {/* <button onClick={() => console.log(signaling)}>ddd</button> */}
      <Lobby
        signaling={signaling}
        setRoomInfoModalOpen={setRoomInfoModalOpen}
      />
      {roomInfoModalOpen.open && (
        <RoomInfoModal
          setRoomInfoModalOpen={setRoomInfoModalOpen}
          roomInfoModalOpen={roomInfoModalOpen}
        />
      )}
      <Profile setProfileModalOpen={setProfileModalOpen} />
      {profileModalOpen && (
        <ProfileEditModal setProfileModalOpen={setProfileModalOpen} />
      )}
      {selectedProfileIcon[0] && <CalendarModal />}
      {selectedProfileIcon[1] && <ChartModal />}
      {selectedProfileIcon[3] && <LogOutModal />}
    </div>
  );
};

export default Main;
