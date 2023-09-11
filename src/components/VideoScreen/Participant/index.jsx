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
  mainVidRef,
  shareState,
  screenMedia,
  setFixedId,
}) => {
  const vidRef = useRef();
  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [openProfile, setOpenProfile] = useState(false);
  const id = useSelector((state) => state.selectedUserInfo.id);
  const master = useSelector((state) => state.selectedUserInfo.mater);

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
  };

  const fixVideo = (e) => {
    if (shareState) {
      mainVidRef.current.srcObject = screenMedia;
    } else {
      mainVidRef.current.srcObject =
        participant.type === "local"
          ? participant.rtcPeer?.getLocalStream()
          : participant.rtcPeer?.getRemoteStream();
    }
    setFixedId(participant.id);
    e.preventDefault();
    mainVidRef.current.muted = true;
  };
  useEffect(() => {
    if (shareState === participant.id) {
      vidRef.current.srcObject = screenMedia;
    } else {
      vidRef.current.srcObject =
        participant.type === "local"
          ? participant.rtcPeer?.getLocalStream()
          : participant.rtcPeer?.getRemoteStream();
    }
  }, [tmp, master, screenMedia]);

  useEffect(() => {
    if (participant.id === id) vidRef.current.muted = true;
    else vidRef.current.muted = !participant.audio;
  }, [participant.audio]);

  useEffect(() => {
    participant.video ? vidRef.current.load() : vidRef.current.pause();
  }, [participant.video, tmp]);

  const openMenu = (e) => {
    e.preventDefault();
    setXY({ x: e.clientX, y: e.clientY });
    setClickedParticipant(participant);
    setDisplayMenu(true);
  };

  return (
    <>
      <li onClick={openMenu}>
        <video
          className={styles.video}
          ref={vidRef}
          autoPlay
          playsInline
          muted={id === participant.id}
        />
        <p className={styles.name}>{participant.id}</p>
      </li>
      {displayMenu && clickedParticipant === participant && (
        <ul
          className={styles.menuList}
          style={{ top: `${xy.y}px`, left: `calc(${xy.x}px - 28%)` }}
        >
          <li
            className={`${
              id === master && participant.id !== id
                ? styles.master
                : styles.normal
            }`}
            onClick={alertUser}
          >
            경고
          </li>
          <li
            className={`${
              id === master && participant.id !== id
                ? styles.master
                : styles.normal
            }`}
            onClick={kickout}
          >
            강퇴
          </li>
          <li
            className={`${
              id === master && participant.id !== id
                ? styles.master
                : styles.normal
            }`}
            onClick={delegate}
          >
            방장 위임
          </li>
          <li className={styles.li} onClick={fixVideo}>
            화면 고정
          </li>
          <li className={styles.li} onClick={() => setOpenProfile(true)}>
            프로필 보기
          </li>
        </ul>
      )}
      {openProfile && <ProfileModal setOpen={setOpenProfile} />}
    </>
  );
};

export default Participant;
