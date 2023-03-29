import React, { useEffect, useRef } from "react";
//import styles from "./ChannelItem.module.css";
import "./ChannelItem.css";
const ChannelItem = ({ channel, isActive, onClick }) => {
  const ref = useRef();

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
        <img src={channel[1]} className="logo" alt={`${channel[0]}icon`} />
        <p>{channel[0]}</p>
      </div>
    </div>
  );
};

export default ChannelItem;
