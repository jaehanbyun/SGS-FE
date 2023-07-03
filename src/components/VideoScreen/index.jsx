import React, { useState } from "react";
import styles from "./VideoScreen.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
// import Chatting from "./Chatting";
import { useSelector } from "react-redux";
import Participant from "./Participant";

const VideoScreen = ({ participants, signaling, roomId }) => {
  const { selectedUserInfo } = useSelector((state) => state);
  const [tmp, setTmp] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [clickedParticipant, setClickedParticipant] = useState(null);
  const [myAudio, setMyAudio] = useState(true);
  const [myVideo, setMyVideo] = useState(true);
  const handleVideo = () => {
    setTmp((prev) => !prev);
  };

  return (
    <div
      onClick={() => {
        if (displayMenu) {
          setDisplayMenu(false);
          setClickedParticipant(null);
        }
      }}
      className={styles.screen}>
      <div className={styles.videoWrap}>
        <ul className={styles.videos}>
          {Object.entries(participants).map(([k, v]) => (
            <Participant
              key={k}
              myAudio={myAudio}
              participant={v}
              clickedParticipant={clickedParticipant}
              setClickedParticipant={setClickedParticipant}
              displayMenu={displayMenu}
              setDisplayMenu={setDisplayMenu}
              tmp={tmp}
            />
          ))}
        </ul>
      </div>
      <button onClick={handleVideo}>비디오 켜기</button>
      {participants[selectedUserInfo.id] && (
        <MenuBar
          participants={participants}
          signaling={signaling}
          myVideo={myVideo}
          myAudio={myAudio}
          setMyVideo={setMyVideo}
          setMyAudio={setMyAudio}
          roomId={roomId}
        />
      )}
      {/* <Chatting /> */}
    </div>
  );
};

export default VideoScreen;
