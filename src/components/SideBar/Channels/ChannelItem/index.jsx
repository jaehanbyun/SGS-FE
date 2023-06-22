import React, { useEffect, useRef } from "react";
//import styles from "./ChannelItem.module.css";
import "./ChannelItem.css";
import { useLocation } from "react-router";
const ChannelItem = ({ channel, isActive, onClick }) => {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/main") {
      ref.current.classList.remove("active--channel");
    } else {
      if (isActive === true) {
        ref.current.classList.add("active--channel");
      } else {
        ref.current.classList.remove("active--channel");
      }
    }
  }, [isActive, location.pathname]);
  return (
    <div>
      <div ref={ref} className="item" onClick={onClick}>
        <img src={channel[1]} className="logo" alt={`${channel[0]}icon`} />
        <p>{channel[0]}</p>
      </div>
    </div>
  );
};

export default ChannelItem;
