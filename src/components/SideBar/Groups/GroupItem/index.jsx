import React, { useEffect, useRef } from "react";
import styles from "./GroupItem.module.css";
import axios from "../../../../api/core";
import { useDispatch } from "react-redux";
import { setSelectedUpdate } from "../../../../redux/selectedUpdate/slice";
import { useLocation, useNavigate } from "react-router-dom";

const GroupItem = ({ group, isActive, onClick }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = async () => {
    try {
      const res = await axios.delete(`/room/group/private/${group.roomId}`);
      dispatch(setSelectedUpdate());
      navigate("/main");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(location.pathname);
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
          src="/images/exit.svg"
          alt="exit"
          onClick={(e) => {
            if (location.pathname === "/main") {
              e.stopPropagation();
              handleExit();
            } else {
              alert("방안에서 삭제는 불가능 합니다.");
            }
          }}
        />
      </div>
    </div>
  );
};

export default GroupItem;
