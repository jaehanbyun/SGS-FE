import React, { useState } from "react";
import Channels from "./Channels";
import Header from "./Header";
import styles from "./SideBar.module.css";
import Groups from "./Groups";

const SideBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
};

export default SideBar;
