import React from "react";
import Button from "../Button";
import styles from "./Profile.module.css";
import ProfileBtns from "./ProfileBtns";
import ProfileImg from "./ProfileImg";
import ProfileInfo from "./ProfileInfo";
import StudyTime from "./StudyTime";
const Profile = ({ setProfileModalOpen }) => {
  const onClick = () => {
    setProfileModalOpen(true);
  };
  return (
    <div className={styles.profile}>
      <ProfileImg />
      <ProfileInfo />
      <Button
        width={280}
        height={40}
        text={"프로필 수정"}
        backgroundColor={"#e0e0e0"}
        color={"#000"}
        fontsize={18}
        fontweight={700}
        onClick={onClick}
      />
      <StudyTime />
      <ProfileBtns />
    </div>
  );
};

export default Profile;
