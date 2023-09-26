import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import Groups from "./Groups";
import Header from "./Header";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";

const SideBar = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedChannel = useSelector((state) => state.selectedChannel);

  useEffect(() => {
    if (selectedChannel === 0) {
      setCurrentIndex(0);
    }
  }, [selectedChannel]);

  return (
    <>
      <input className={styles.hiddenCheck} type="checkbox" id="navigation" />
      <label className={styles.check} htmlFor="navigation">
        <img src="/images/menu-3lines.svg" alt="menu" />
      </label>
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
          <Groups
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
      <div className={styles.obfuscator}></div>
    </>
  );
});

export default SideBar;
