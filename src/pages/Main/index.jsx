import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CalendarModal from "../../components/Modal/CalendarModal";
import ChartModal from "../../components/Modal/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import SideBar from "../../components/SideBar";
import styles from "./Main.module.css";
import ProfileModal from "../../components/Modal/ProfileModal";
import { useNavigate } from "react-router-dom";
import LogOutModal from "../../components/Modal/LogOutModal";

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserState } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedUserState) {
    } else {
      navigate("/");
    }
  });
  return (
    <div className={styles.main}>
      <SideBar />
      <Lobby />
      <Profile setProfileModalOpen={setProfileModalOpen} />
      {profileModalOpen && (
        <ProfileEditModal setProfileModalOpen={setProfileModalOpen} />
      )}
      {selectedProfileIcon[0] && <CalendarModal />}
      {selectedProfileIcon[1] && <ChartModal />}
      {selectedProfileIcon[3] && <LogOutModal />}
    </div>
  );
};

export default Main;
