import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChartModal from "../../components/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileModal from "../../components/ProfileModal";
import SideBar from "../../components/SideBar";
import styles from "./Main.module.css";

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { selectedProfileIcon } = useSelector((state) => state);
  return (
    <div className={styles.main}>
      <SideBar />
      <Lobby />
      <Profile setProfileModalOpen={setProfileModalOpen} />
      {profileModalOpen && (
        <ProfileModal setProfileModalOpen={setProfileModalOpen} />
      )}
      {selectedProfileIcon[1] && <ChartModal />}
    </div>
  );
};

export default Main;
