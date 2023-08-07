import React, { useEffect, useRef, useState } from "react";
import styles from "./participant.module.css";
import ProfileModal from "../../Modal/ProfileModal";
import axios from "../../../api/core";
import { useSelector } from "react-redux";

const Participant = ({
  displayMenu,
  setDisplayMenu,
  participant,
  clickedParticipant,
  setClickedParticipant,
  tmp,
  roomId,
  isPublic,
}) => {
  const vidRef = useRef();
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [openProfile, setOpenProfile] = useState(false);
  const { selectedUserInfo } = useSelector((state) => state);

  const alertUser = (e) => {
    e.preventDefault();
    axios
      .patch("/room/group/alert", {
        roomType: isPublic,
        roomId,
        targetId: participant.id,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const kickout = (e) => {
    console.log(participant);
    e.preventDefault();
    axios
      .patch("/room/group/kickout", {
        roomType: isPublic,
        roomId,
        targetId: participant.id,
      })
      .then(console.log);
  };

  const delegate = (e) => {
    e.preventDefault();
    axios.patch("/room/group/delegate", {
      roomType: isPublic,
      roomId,
      targetId: participant.id,
    });
    console.log(selectedUserInfo);
  };
  useEffect(() => {
    vidRef.current.srcObject =
      participant.type === "local"
        ? participant.rtcPeer?.getLocalStream()
        : participant.rtcPeer?.getRemoteStream();
    vidRef.current.muted = !participant.audio;
    participant.video ? vidRef.current.play() : vidRef.current.pause();
    console.log(participant.audio);
  }, [participant, tmp, selectedUserInfo.master]);

  const openMenu = (e) => {
    e.preventDefault();
    setXY({ x: e.clientX, y: e.clientY });
    setClickedParticipant(participant);
    setDisplayMenu(true);
  };

  return (
    <>
      <li className={styles.participant} onClick={openMenu}>
        <video
          id={participant.id}
          className={styles.video}
          ref={vidRef}
          autoPlay
          playsInline
        />
        <p className={styles.name}>{participant.id}</p>
      </li>
      {displayMenu && clickedParticipant === participant && (
        <ul
          className={styles.menuList}
          style={{ top: `${xy.y}px`, left: `${xy.x}px` }}
        >
          <li
            className={`${
              selectedUserInfo.id === selectedUserInfo.master &&
              participant.id !== selectedUserInfo.id
                ? styles.master
                : styles.normal
            }`}
            onClick={alertUser}
          >
            경고
          </li>
          <li
            className={`${
              selectedUserInfo.id === selectedUserInfo.master &&
              participant.id !== selectedUserInfo.id
                ? styles.master
                : styles.normal
            }`}
            onClick={kickout}
          >
            강퇴
          </li>
          <li
            className={`${
              selectedUserInfo.id === selectedUserInfo.master &&
              participant.id !== selectedUserInfo.id
                ? styles.master
                : styles.normal
            }`}
            onClick={delegate}
          >
            방장 위임
          </li>
          <li className={styles.profileLi} onClick={() => setOpenProfile(true)}>
            프로필 보기
          </li>
        </ul>
      )}
      {openProfile && <ProfileModal setOpen={setOpenProfile} />}
    </>
  );
};

export default Participant;
