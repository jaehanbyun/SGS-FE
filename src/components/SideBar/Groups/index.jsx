import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedGroup } from "../../../redux/selectedGroup/slice";
import GroupItem from "./GroupItem";
import styles from "./Groups.module.css";

const Group = [
  ["정컴 모임", "/images/account_circle.svg"],
  ["개발자 취준", "/images/account_circle.svg"],
  ["부산대 모임", "/images/account_circle.svg"],
  ["스터디", "/images/account_circle.svg"],
];

const Groups = ({ currentIndex, setCurrentIndex }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      {Group.map((group, index) => (
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
