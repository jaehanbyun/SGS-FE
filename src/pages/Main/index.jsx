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

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserState } = useSelector((state) => state);
  const { selectedUserInfo } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useRef({});
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (selectedUserState) {
    } else {
      navigate("/");
    }
    connect();
    console.log("header", axios.defaults.headers.common.Authorization);
    return () => disconnect();
  }, [selectedUserState]);

  const connect = () => {
    // 연결할 때
    client.current.webSocketFactory = function () {
      return new SockJS("http://13.209.245.103:8031/chat/connect");
    };
    client.current = Stomp.over(client.current.webSocketFactory);
    client.current.connectHeaders = {
      Authorization: axios.defaults.headers.common.Authorization,
    };

    client.current.activate(); // 클라이언트 활성화
    console.log("client connected");

    client.current.onConnect = () => {
      console.log("success");
      subscribe();
    };
  };

  const subscribe = () => {
    client.current.subscribe(
      "/topic/1",
      (body) => {
        const json_body = JSON.parse(body.body);
        console.log(json_body);
        setChatList((_chat_list) => [..._chat_list, json_body]);
      },
      { Authorization: axios.defaults.headers.common.Authorization }
    );
  };
  const publish = async () => {
    if (!client.current.connected) {
      console.log("client disconnected");
      return;
    }
    try {
      const res = await axios.post("/chat/send", {
        messageType: "TEXT",
        roomId: 1,
        content: "테스트중입니다.",
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const disconnect = () => {
    // 연결이 끊겼을 때
    client.current.deactivate();
    console.log("client disconnected");
  };

  return (
    <div className={styles.main}>
      <button
        onClick={() => {
          publish();
        }}
      >
        fdsa
      </button>
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
