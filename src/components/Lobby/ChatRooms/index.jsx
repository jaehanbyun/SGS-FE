import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatRooms.module.css";
import Room from "./Room";
import axios from "../../../api/core";
import { useSelector } from "react-redux";

const channelName = [
  "",
  "ELEMENTARY_SCHOOL",
  "MIDDLE_SCHOOL",
  "HIGH_SCHOOL",
  "UNIVERSITY",
  "BUSINESS",
];

const ChatRooms = ({
  signaling,
  rooms,
  setRooms,
  nextRoomId,
  setNextRoomId,
}) => {
  const { selectedChannel } = useSelector((state) => state);
  const target = useRef();
  const roomRef = useRef();
  const [isScroll, setIsScroll] = useState(false);
  const [isData, setIsData] = useState(true);

  const getRooms = async () => {
    try {
      let res;
      if (selectedChannel === 0) {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: nextRoomId,
          },
        });
      } else {
        res = await axios.get("/room/group", {
          params: {
            lastRoomId: nextRoomId,
            channel: channelName[selectedChannel],
          },
        });
      }
      // console.log(res);
      const newRooms = [...rooms, ...res.data.data];
      setRooms(newRooms);
      setNextRoomId(newRooms[newRooms.length - 1].roomId);
    } catch (err) {
      setIsData(false);
      throw new Error(err);
    }
  };
  useEffect(() => {
    if (roomRef.current) {
      if (
        roomRef.current.clientHeight >= roomRef.current.parentNode.clientHeight
      ) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
    let observer;
    if (target.current) {
      const handleInterSect = async ([entry], observer) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          await getRooms();
          observer.observe(entry.target);
        }
      };
      observer = new IntersectionObserver(handleInterSect);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, isData, isScroll, rooms]);
  return (
    <div className={styles.rooms}>
      <div ref={roomRef}>
        {rooms.map((room) => (
          <Room signaling={signaling} room={room} key={room.roomId} />
        ))}
      </div>
      {isData && isScroll ? <div ref={target}></div> : null}
    </div>
  );
};

export default ChatRooms;
