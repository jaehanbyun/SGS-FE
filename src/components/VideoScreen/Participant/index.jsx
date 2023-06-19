import React, { useEffect, useRef, useState } from "react";
import styles from "./participant.module.css";

const Participant = ({ displayMenu, setDisplayMenu, participant, tmp }) => {
  const vidRef = useRef();
  const [xy, setXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    vidRef.current.srcObject =
      participant.type === "local"
        ? participant.rtcPeer.getLocalStream()
        : participant.rtcPeer.getRemoteStream();
  }, [participant, tmp]);
  const openMenu = (e) => {
    setXY({ x: e.clientX, y: e.clientY });
    setDisplayMenu(true);
  };
  return (
    <>
      <li onClick={openMenu}>
        <video className={styles.video} ref={vidRef} autoPlay playsInline />
        <div className={styles.name}>{participant.type}</div>
        <button onClick={() => console.log(participant)}>participant</button>
      </li>
      {displayMenu && (
        <ul
          className={styles.menuList}
          style={{ top: `${xy.y + 10}px`, left: `${xy.x + 5}px` }}
        >
          <li>경고</li>
          <li>강퇴</li>
          <li>방장 위임</li>
          <li>프로필 보기</li>
        </ul>
      )}
    </>
  );
};

export default Participant;
