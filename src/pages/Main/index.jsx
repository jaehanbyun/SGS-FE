import React from "react";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import SideBar from "../../components/SideBar";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <SideBar />
      <Lobby />
      <Profile />
    </div>
  );
};

export default Main;
