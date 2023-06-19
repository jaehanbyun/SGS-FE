import React, { useEffect, useState } from "react";
import styles from "./VideoScreen.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
import Chatting from "./Chatting";
import { useSelector } from "react-redux";
import Participant from "./Participant";

const VideoScreen = ({ studyTime, signaling, roomId }) => {
  const {
    selectedUserInfo: { id },
  } = useSelector((state) => state);
  const [tmp, setTmp] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const handleVideo = () => {
    setTmp((prev) => !prev);
  };
  useEffect(() => {
    signaling.joinRoom(id, roomId);
  }, [signaling, id, roomId]);
  const renderVideo = () => {
    for (const [k, v] of signaling._participants) {
      return (
        <Participant
          key={k}
          participant={v}
          displayMenu={displayMenu}
          setDisplayMenu={setDisplayMenu}
          tmp={tmp}
        />
      );
    }
  };
  return (
    <div
      onClick={() => {
        if (displayMenu) {
          setDisplayMenu(false);
        }
      }}
      className={styles.screen}
    >
      <div className={styles.videoWrap}>
        <ul className={styles.videos}>
          {/* {Object.entries(signaling._participants).map((participant, i) => (
            <Participant key={i} participant={participant} tmp={tmp} />
          ))} */}
          {renderVideo()}
        </ul>
      </div>
      <button onClick={() => console.log(signaling._participants)}>
        _participants
      </button>
      <button onClick={handleVideo}>비디오 켜기</button>
      <MenuBar signaling={signaling} />
      <Chatting />
    </div>
  );
};

export default VideoScreen;
