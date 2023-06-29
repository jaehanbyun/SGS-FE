import React, { useEffect, useRef, useState } from "react";
import styles from "./participant.module.css";
import ProfileModal from "../../Modal/ProfileModal";
import axios from "axios";

const Participant = ({
  myAudio,
  displayMenu,
  setDisplayMenu,
  participant,
  clickedParticipant,
  setClickedParticipant,
  tmp,
}) => {
  const vidRef = useRef();
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [openProfile, setOpenProfile] = useState(false);
  const kickout = () => {
    console.log(participant);
    axios.patch("//localhost:5001/room/group/kickout", {
      roomType: false,
      roomId: "135",
      targetId: participant.id,
    });
  };
  useEffect(() => {
    vidRef.current.srcObject =
      participant.type === "local"
        ? participant.rtcPeer?.getLocalStream()
        : participant.rtcPeer?.getRemoteStream();
    // console.log(participant.rtcPeer.getRemoteStream());
    // console.log(participant.rtcPeer.getLocalStream());
  }, [participant, tmp]);
  useEffect(() => {
    vidRef.current.muted = myAudio;
  }, [myAudio]);
  const openMenu = (e) => {
    setXY({ x: e.clientX, y: e.clientY });
    setClickedParticipant(participant);
    setDisplayMenu(true);
  };
  return (
    <>
      <li onClick={openMenu}>
        <video className={styles.video} ref={vidRef} autoPlay playsInline />
        <div className={styles.name}>{participant.type}</div>
        <button onClick={() => console.log(participant)}>participant</button>
      </li>
      {displayMenu && clickedParticipant === participant && (
        <ul
          className={styles.menuList}
          style={{ top: `${xy.y}px`, left: `${xy.x}px` }}
        >
          <li onClick={() => vidRef.current.pause()}>경고</li>
          <li onClick={kickout}>강퇴</li>
          <li onClick={() => console.log(clickedParticipant)}>방장 위임</li>
          <li onClick={() => setOpenProfile(true)}>프로필 보기</li>
        </ul>
      )}
      {openProfile && <ProfileModal setOpen={setOpenProfile} />}
    </>
  );
};

export default Participant;
