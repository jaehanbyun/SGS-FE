import React, { useState } from "react";
import moment from "moment";
import Button from "../../Button";
import styles from "./MenuBar.module.css";
import { useNavigate } from "react-router-dom";

const medias = [
  "/images/microphone.svg",
  "/images/video.svg",
  "/images/screen_share.svg",
];

const MenuBar = ({ signaling }) => {
  const navigate = useNavigate();
  const [timerState, setTimerState] = useState(false);
  const [timerText, setTimerText] = useState("타이머 시작");
  const handleTimer = () => {
    if (timerState) {
      setTimerState(false);
      setTimerText("타이머 시작");
    } else {
      setTimerState(true);
      setTimerText("타이머 정지");
    }
  };
  const roomExit = () => {
    navigate("/main");
    // signaling.leaveRoom();
    signaling.socket.close();
  };
  return (
    <footer className={styles.menu}>
      <div className={styles.controller}>
        {medias.map((media) => (
          <img key={media} src={media} alt="이미지" />
        ))}
      </div>
      <div className={styles.studyTime}>
        <div>총 공부 시간</div>
        <div>{moment(new Date()).format("HH:MM:ss")}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button
            width={"113px"}
            height={"40px"}
            backgroundColor={"#ADC37D"}
            text={timerText}
            color={"#fff"}
            onClick={handleTimer}
          />
        </div>
        <div className={styles.button}>
          <Button
            width={"113px"}
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
