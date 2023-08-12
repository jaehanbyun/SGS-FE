import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupItem from "./GroupItem";
import styles from "./Groups.module.css";
import axios from "../../../api/core";
import { useNavigate } from "react-router";
import { setSelectedChannel } from "../../../redux/selectedChannel/slice";
import { setSelectedRoomInfo } from "../../../redux/selectedRoomInfo/slice";
import { setSelectedUserInfo } from "../../../redux/selectedUserInfo/slice";

const Groups = ({ currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);
  const { selectedUpdate } = useSelector((state) => state);
  const { selectedUserInfo } = useSelector((state) => state);
  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const res = await axios.get("/room/group/private");
      if (res.status === 204) {
        setGroups([]);
        return;
      }
      setGroups([...res.data.data]);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };

  const privateIn = async (id) => {
    try {
      const res = await axios.post("/room/group/private/in", {
        roomId: id,
      });
      dispatch(
        setSelectedUserInfo({
          ...selectedUserInfo,
          master: res.data.data.roomOwner,
        })
      );
      console.log(selectedUserInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGroups();
  }, [selectedUpdate]);
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
            privateIn(group.roomId);
            navigate(`/main/${group.roomId}`);
          }}
        />
      ))}
    </div>
  );
};

export default Groups;
