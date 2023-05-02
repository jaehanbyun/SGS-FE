import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatRooms.module.css";
import Room from "./Room";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const ChatRooms = ({ rooms, setRooms }) => {
  const target = useRef();
  const roomRef = useRef();
  const [isScroll, setIsScroll] = useState(false);
  const [isData, setIsData] = useState(true);
  const mock = new MockAdapter(axios);
  mock.onGet("/room").reply((config) => {
    return [
      200,
      [
        {
          roomId: Math.floor(Math.random() * 90000) + 10000,
          roomName: "추가 데이터",
          roomChannel: "middle",
          roomOwner: "user1",
          curUser: 2,
          maxUser: 5,
          createdAt: "2023-01-31T18:01:22.2072675",
        },
        {
          roomId: Math.floor(Math.random() * 90000) + 10000,
          roomName: "추가 데이터",
          roomChannel: "elemantary",
          roomOwner: "user1",
          curUser: 1,
          maxUser: 3,
          createdAt: "2023-03-30T15:01:22.2072675",
        },
        {
          roomId: Math.floor(Math.random() * 90000) + 10000,
          roomName: "추가 데이터",
          roomChannel: "elemantary",
          roomOwner: "user1",
          curUser: 1,
          maxUser: 3,
          createdAt: "2023-01-31T18:01:22.2072675",
        },
      ],
    ];
  });
  const getRooms = async () => {
    try {
      const res = await axios.get("/room");
      const newRooms = [...rooms, ...res.data];
      setRooms(newRooms);
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
          <Room room={room} key={room.roomId} />
        ))}
      </div>
      {isData && isScroll ? <div ref={target}></div> : null}
    </div>
  );
};

export default ChatRooms;
