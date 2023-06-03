import React, { useEffect, useState } from "react";
import styles from "./Video.module.css";
// import SockJS from "sockjs-client";
import MenuBar from "./MenuBar";
import Chatting from "./Chatting";
import Participants from "./Participants";
import { useSelector } from "react-redux";

const tmp = ["참가지1", "참가자2", "참가자3"];
const Video = ({ roomId }) => {
  return (
    <>
      <div className={styles.screen}>
        <div className={styles.videos}>
          <Participants participants={tmp} />
        </div>
        <MenuBar roomId={roomId} />
        <Chatting />
      </div>
    </>
  );
};

export default Video;
