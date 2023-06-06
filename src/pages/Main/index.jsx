import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../../components/Modal/CalendarModal";
import ChartModal from "../../components/Modal/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import LogOutModal from "../../components/Modal/LogOutModal";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";
import MockAdapter from "axios-mock-adapter";
import axios from "../../api/core";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { connect, subscribe, unsubscribe } from "../../utils/stomp";

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserInfo } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chatList, setChatList] = useState([]);

  var client = null;

  useEffect(() => {
    client = connect(client);
    dispatch(setSelectedUserInfo({ client: client }));
    console.log(selectedUserInfo);
    return () => {
      if (client.connected) {
        unsubscribe(client, 0);
      }
    };
  }, []);

  return (
    <div className={styles.main}>
      <Lobby />
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
