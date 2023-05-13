import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGroup } from "../../../redux/selectedGroup/slice";
import GroupItem from "./GroupItem";
import styles from "./Groups.module.css";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const Groups = ({ currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    try {
      const res = await axios.get("/groups");
      setGroups([...res.data]);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    const mock = new MockAdapter(axios);
    mock.onGet("/groups").reply(() => {
      return [
        200,
        [
          {
            roomId: 1,
            roomName: "정컴 모임",
            roomImage: "/images/account_circle.svg",
          },
          {
            roomId: 2,
            roomName: "부산대 모임",
            roomImage: "/images/account_circle.svg",
          },
          {
            roomId: 3,
            roomName: "스터디",
            roomImage: "/images/account_circle.svg",
          },
        ],
      ];
    });
    getGroups();
  }, []);
  return (
    <div className={styles.container}>
      {groups.map((group, index) => (
        <GroupItem
          key={index}
          group={group}
          isActive={currentIndex === index + 6}
          onClick={() => {
            dispatch(setSelectedGroup(index));
            setCurrentIndex(index + 6);
          }}
        />
      ))}
    </div>
  );
};

export default Groups;
