import React, { useEffect, useRef } from "react";
import styles from "./GroupItem.module.css";
import axios from "../../../../api/core";

const GroupItem = ({ group, isActive, onClick }) => {
  const ref = useRef();

  const handleExit = async () => {
    try {
      const res = await axios.delete(`/room/group/private/${group.roomId}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isActive === true) {
      ref.current.classList.add("active--channel");
    } else {
      ref.current.classList.remove("active--channel");
    }
  }, [isActive]);
  return (
    <div>
      <div ref={ref} className="item" onClick={onClick}>
        <p>{group.roomName}</p>
        <img
          className={styles.exit}
          src="images/exit.svg"
          alt="exit"
          onClick={(e) => {
            e.stopPropagation();
            handleExit();
          }}
        />
      </div>
    </div>
  );
};

export default GroupItem;
