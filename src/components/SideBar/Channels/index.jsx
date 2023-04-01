import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedChannel } from "../../../redux/selectedChannel/slice";
import ChannelItem from "./ChannelItem";
import styles from "./Channels.module.css";

const channel = [
  ["홈", "/images/home.svg"],
  ["초등", "/images/elementary.svg"],
  ["중등", "/images/middle.svg"],
  ["고등", "/images/high.svg"],
  ["대학생", "/images/univ.svg"],
  ["취업준비", "/images/business.svg"],
];

const Channels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {channel.map((channel, index) => (
        <ChannelItem
          key={index}
          channel={channel}
          isActive={currentIndex === index}
          onClick={() => {
            dispatch(setSelectedChannel(index));
            setCurrentIndex(index);
          }}
        />
      ))}
    </div>
  );
};

export default Channels;
