import React, { useEffect, useRef } from "react";
import styles from "./participant.module.css";

const Participant = ({ participant, tmp }) => {
  const vidRef = useRef();
  useEffect(() => {
    vidRef.current.srcObject =
      participant[1].type === "local"
        ? participant[1].rtcPeer.getLocalStream()
        : participant[1].rtcPeer.getRemoteStream();
  }, [participant, tmp]);
  return (
    <li>
      <video className={styles.video} ref={vidRef} autoPlay playsInline />
      <div className={styles.name}>{participant[1].type}</div>
      <button onClick={() => console.log(participant)}>participant</button>
    </li>
  );
};

export default Participant;
