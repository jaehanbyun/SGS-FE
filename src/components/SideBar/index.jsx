import React from "react";
import Channels from "./Channels";
import Header from "./Header";
import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.frame}>
        <Header title={"채널"} />
        <Channels />
      </div>
      <div className={styles.frame}>
        <Header title={"그룹"} />
      </div>
    </div>
  );
};

export default SideBar;
