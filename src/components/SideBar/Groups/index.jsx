import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGroup } from "../../../redux/selectedGroup/slice";
import GroupItem from "./GroupItem";
import styles from "./Groups.module.css";
import axios from "../../../api/core";
import MockAdapter from "axios-mock-adapter";

const Groups = ({ currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    try {
      const res = await axios.get("/room/group/private");
      console.log(res.data);
      setGroups([...res.data.data]);
    } catch (err) {
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
            dispatch(setSelectedGroup(index));
            setCurrentIndex(index + 6);
          }}
        />
      ))}
    </div>
  );
};

export default Groups;
