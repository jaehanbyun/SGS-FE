import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarModal from "../../components/Modal/CalendarModal";
import ChartModal from "../../components/Modal/ChartModal";
import Lobby from "../../components/Lobby";
import Profile from "../../components/Profile";
import ProfileEditModal from "../../components/Modal/ProfileEditModal";
import SideBar from "../../components/SideBar";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import LogOutModal from "../../components/Modal/LogOutModal";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";

const data = {
  name: "김철수",
  email: "abcd123@gmail.com",
  profileImage: "/images/account_circle.svg",
  studyTime: "12435",
  description: "안녕하세요",
};

const Main = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { selectedProfileIcon } = useSelector((state) => state);
  const { selectedUserState } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUserState) {
      console.log("true");
      dispatch(setSelectedUserInfo(data));
    } else {
      console.log("false");
      navigate("/");
    }
  }, [selectedUserState]);
  return (
    <div className={styles.main}>
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
