import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGroup } from "../../../redux/selectedGroup/slice";
import GroupItem from "./GroupItem";
import styles from "./Groups.module.css";
import axios from "../../../api/core";
import { useNavigate } from "react-router";
import { setSelectedChannel } from "../../../redux/selectedChannel/slice";
import { setSelectedRoomInfo } from "../../../redux/selectedRoomInfo/slice";

const Groups = ({ currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const res = await axios.get("/room/group/private");
      setGroups([...res.data.data]);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
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
            dispatch(setSelectedChannel(index + 6));
            dispatch(setSelectedRoomInfo({ type: false }));
            setCurrentIndex(index + 6);
            navigate(`/main/${group.roomId}`);
          }}
        />
      ))}
    </div>
  );
};

export default Groups;
