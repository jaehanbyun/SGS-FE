import React, { useEffect, useRef, useState } from "react";
import styles from "./VideoScreen.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
// import Chatting from "./Chatting";
import { useSelector } from "react-redux";
import Participant from "./Participant";
import axios from "../../api/core";
const VideoScreen = ({ participants, signaling, roomId }) => {
  const {
    selectedUserInfo: { id },
  } = useSelector((state) => state);
  const [tmp, setTmp] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [clickedParticipant, setClickedParticipant] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [shareState, setShareState] = useState("");
  const [screenMedia, setScreenMedia] = useState();
  const [fixedId, setFixedId] = useState("");
  const mainVidRef = useRef();

  useEffect(() => {
    setTmp((prev) => !prev);
  }, [participants]);

  useEffect(() => {
    const publicOrNot = async () => {
      const res = await axios.get("/room/group/private");
      if (
        res.data &&
        res.data.data.some((obj) => obj.roomId === Number(roomId))
      ) {
        setIsPublic(false);
      }
    };
    publicOrNot();
  }, [roomId, id]);
  useEffect(() => {
    if (fixedId && !participants[fixedId].video) {
      mainVidRef.current.srcObject = null;
      alert(`${fixedId}님이 비디오를 중단하였습니다.`);
      setFixedId("");
    }
  }, [participants]);
  return (
    <div
      onClick={() => {
        if (displayMenu) {
          setDisplayMenu(false);
          setClickedParticipant(null);
        }
      }}
      className={styles.screen}
    >
      <div className={styles.videoWrap}>
        <ul className={styles.videos}>
          {Object.entries(participants).map(([k, v]) => (
            <Participant
              key={k}
              participant={v}
              clickedParticipant={clickedParticipant}
              setClickedParticipant={setClickedParticipant}
              displayMenu={displayMenu}
              setDisplayMenu={setDisplayMenu}
              tmp={tmp}
              roomId={roomId}
              isPublic={isPublic}
              mainVidRef={mainVidRef}
              shareState={shareState}
              screenMedia={screenMedia}
              setFixedId={setFixedId}
            />
          ))}
        </ul>
      </div>

      {/* <button onClick={() => setTmp(!tmp)}>비디오 켜기</button> */}

      <video className={styles.fixed} ref={mainVidRef} autoPlay playsInline />

      <button
        className={styles.unfix}
        onClick={() => {
          mainVidRef.current.srcObject = null;
          setFixedId("");
        }}
      >
        {mainVidRef.current &&
          mainVidRef.current.srcObject &&
          "고정된 화면 제거"}
      </button>

      {participants[id] && (
        <MenuBar
          participants={participants}
          signaling={signaling}
          roomId={roomId}
          isPublic={isPublic}
          mainVidRef={mainVidRef}
          setShareState={setShareState}
          setScreenMedia={setScreenMedia}
        />
      )}
      {/* <Chatting /> */}
    </div>
  );
};

export default VideoScreen;
