import React from "react";
import moment from "moment";
import Button from "../../Button";
import styles from "./MenuBar.module.css";
import { useNavigate } from "react-router-dom";

const medias = [
  "/images/microphone.svg",
  "/images/video.svg",
  "/images/screen_share.svg",
];

const MenuBar = () => {
  const navigate = useNavigate();
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
            text={"타이머 정지"}
            color={"#fff"}
          />
        </div>
        <div className={styles.button}>
          <Button
            width={"113px"}
            height={"40px"}
            backgroundColor={"#E81515"}
            text={"나가기"}
            color={"#fff"}
            onClick={() => navigate("/main")}
          />
        </div>
      </div>
    </footer>
  );
};

export default MenuBar;
