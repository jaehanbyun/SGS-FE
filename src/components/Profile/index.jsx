import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import styles from "./Profile.module.css";
import ProfileBtns from "./ProfileBtns";
import ProfileImg from "./ProfileImg";
import ProfileInfo from "./ProfileInfo";
import StudyTime from "./StudyTime";

const Profile = React.memo(({ setProfileModalOpen }) => {
  const { selectedUserInfo } = useSelector((state) => state);
  const { name, email, profileImage, studyTime, description } =
    selectedUserInfo;
  const onClick = () => {
    setProfileModalOpen(true);
  };
  return (
    <div className={styles.profile}>
      <ProfileImg profileImage={profileImage} />
      <ProfileInfo name={name} email={email} />
      <Button
        width={"80%"}
        height={"4.5%"}
        text={"프로필 수정"}
        backgroundColor={"#e0e0e0"}
        color={"#000"}
        fontsize={18}
        fontweight={700}
        onClick={onClick}
      />
      <StudyTime studyTime={studyTime} />
      <ProfileBtns />
    </div>
  );
});

export default Profile;
