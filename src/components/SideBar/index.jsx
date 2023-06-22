import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import Groups from "./Groups";
import Header from "./Header";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";

const SideBar = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { selectedChannel } = useSelector((state) => state);
  useEffect(() => {
    if (selectedChannel === 0) {
      setCurrentIndex(0);
    }
    console.log(selectedChannel);
  }, [selectedChannel]);
  return (
    <div className={styles.sidebar}>
      <div className={styles.frame}>
        <Header title={"채널"} />
        <Channels
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className={styles.frame}>
        <Header title={"그룹"} />
        <Groups currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
});

export default SideBar;
