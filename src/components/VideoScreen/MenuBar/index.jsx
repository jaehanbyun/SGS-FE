import React, { useEffect, useState } from "react";
import Button from "../../Button";
import styles from "./MenuBar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../../../hooks/useTimer";
import moment from "moment";
import axios from "../../../api/core";
import RoomCodeModal from "./RoomCodeModal/RoomCodeModal";
import { setSelectedChannel } from "../../../redux/selectedChannel/slice";

const MenuBar = ({ participants, signaling, roomId, isPublic, mainVidRef }) => {
  const navigate = useNavigate();
  const {
    selectedUserInfo: { id },
  } = useSelector((state) => state);
  const [timerText, setTimerText] = useState("타이머 시작");
  const [timerState, setTimerState] = useState(false);
  const [showTime, setShowTime] = useState(participants[id]?.studyTime);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const formattedTime = useTimer(participants[id]?.studyTime, timerState);

  const dispatch = useDispatch();

  useEffect(() => {
    setShowTime(formattedTime);
  }, [formattedTime]);

  useEffect(() => {
    setAudio(true);
    setVideo(true);
  }, [roomId]);
  const handleVideo = () => {
    signaling.sendMessage({
      id: "videoState",
      userId: id,
      video: !participants[id].video,
    });
    setVideo(!video);
  };

  const handleAudio = () => {
    signaling.sendMessage({
      id: "audioState",
      userId: id,
      audio: !participants[id].audio,
    });
    setAudio(!audio);
  };

  const screenShare = async () => {
    let mediaStream = null;
    try {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: true,
      });
      // participants[id].rtcPeer.srcObject
      console.log(mediaStream);
    } catch (ex) {
      console.log("Error occurred", ex);
    }
  };
  const handleTimer = () => {
    if (timerState) {
      setTimerState(false);
      setTimerText("타이머 시작");
      signaling.sendMessage({
        id: "timerState",
        timerState: false,
        time: moment().format("HH:mm:ss"),
      });
    } else {
      setTimerState(true);
      setTimerText("타이머 정지");
      signaling.sendMessage({
        id: "timerState",
        timerState: true,
        time: moment().format("HH:mm:ss"),
      });
    }
    console.log(participants[id]);
  };
  const privateRoom = async () => {
    const res = await axios.get("/room/group/private");
    if (res.data.data.some((obj) => obj.roomId === Number(roomId))) {
      axios.patch("/room/group/private", { roomId: roomId }).then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setCode(res.data.data.roomCode);
          setCodeModalOpen(true);
        }
      });
    }
  };
  const roomExit = async () => {
    dispatch(setSelectedChannel(0));
    console.log(participants);
    for (const key in signaling._participants) {
      participants[key].rtcPeer.dispose();
    }
    await signaling.socket.close();
    signaling._participants = {};
    navigate("/main");
    console.log("roomexit");
  };

  return (
    <footer className={styles.menu}>
      <div className={styles.controller}>
        <img
          onClick={handleAudio}
          src={audio ? "/images/microphone.svg" : "/images/mic_off.svg"}
          alt="이미지"
        />
        <img
          onClick={handleVideo}
          src={video ? "/images/video.svg" : "/images/video_off.svg"}
          alt="이미지"
        />
        <img
          onClick={screenShare}
          src="/images/screen_share.svg"
          alt="이미지"
        />
      </div>
      <div className={styles.studyTime}>
        <div>총 공부 시간</div>
        <div>{showTime}</div>
      </div>
      <div className={styles.buttons}>
        {!isPublic && (
          <div className={styles.button}>
            <Button
              width={"108px"}
              height={"40px"}
              backgroundColor={"#FE9A2E"}
              text={"초대코드 생성"}
              color={"#fff"}
              onClick={privateRoom}
            />
          </div>
        )}
        <div className={styles.button}>
          <Button
            width={"108px"}
            height={"40px"}
            backgroundColor={"#ADC37D"}
            text={timerText}
            color={"#fff"}
            onClick={handleTimer}
          />
        </div>
        <div className={styles.button}>
          <Button
            width={"108px"}
            height={"40px"}
            backgroundColor={"#E81515"}
            text={"나가기"}
            color={"#fff"}
            onClick={roomExit}
          />
        </div>
      </div>
      {codeModalOpen && (
        <RoomCodeModal code={code} setCodeModalOpen={setCodeModalOpen} />
      )}
    </footer>
  );
};

export default MenuBar;
