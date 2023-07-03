import React, { useEffect, useState } from "react";
import Button from "../../Button";
import styles from "./MenuBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useTimer from "../../../hooks/useTimer";
import moment, { now } from "moment";
import axios from "../../../api/core";

const MenuBar = ({
  participants,
  signaling,
  myVideo,
  myAudio,
  setMyVideo,
  setMyAudio,
  roomId,
}) => {
  const navigate = useNavigate();
  const {
    selectedUserInfo: { id },
  } = useSelector((state) => state);
  const [timerText, setTimerText] = useState("타이머 시작");
  const [timerState, setTimerState] = useState(false);
  const [showTime, setShowTime] = useState(participants[id]?.studyTime);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const formattedTime = useTimer(participants[id]?.studyTime, timerState);

  useEffect(() => {
    setShowTime(formattedTime);
  }, [formattedTime]);

  useEffect(() => {
    const privateOrNot = async () => {
      const res = await axios.get("/room/group/private");
      if (
        res.data &&
        res.data.data.some((obj) => obj.roomId === Number(roomId))
      ) {
        setIsPrivate(true);
      }
    };
    privateOrNot();
  }, [roomId]);

  const handleVideo = () => {
    signaling.sendMessage({
      id: "videoState",
      userId: id,
      video: !participants[id].video,
    });
    if (video) {
      setVideo(false);
      setMyVideo(false);
    } else {
      setVideo(true);
      setMyVideo(true);
    }
    setVideo(!video);
  };
  const handleAudio = () => {
    signaling.sendMessage({
      id: "audioState",
      userId: id,
      audio: !participants[id].audio,
    });
    if (audio) {
      setAudio(false);
      setMyAudio(true);
    } else {
      setAudio(true);
      setMyAudio(false);
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
    console.log(res);
    if (res.data.data.some((obj) => obj.roomId === Number(roomId))) {
      axios.patch("/room/group/private", { room_id: roomId }).then(console.log);
      console.log("good");
    }
  };
  const roomExit = () => {
    navigate("/main");
    signaling.socket.close();
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
        <img src="/images/screen_share.svg" alt="이미지" />
      </div>
      <div className={styles.studyTime}>
        <div>총 공부 시간</div>
        <div>{showTime}</div>
      </div>
      <div className={styles.buttons}>
        {isPrivate && (
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
    </footer>
  );
};

export default MenuBar;
