import React from "react";
import styles from "./Video.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
import Participants from "./Participants";

const tmp = ["참가지1", "참가자2", "참가자3"];
const Video = ({ roomId }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.videos}>
        <Participants participants={tmp} />
      </div>
      <MenuBar roomId={roomId} />
    </div>
  );
};

export default Video;
