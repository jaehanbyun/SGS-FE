import React from "react";
import styles from "./Profile.module.css";
import ProfileBtns from "./ProfileBtns";
import ProfileImg from "./ProfileImg";
import ProfileInfo from "./ProfileInfo";
import StudyTime from "./StudyTime";
const Profile = () => {
  return (
    <div className={styles.profile}>
      <ProfileImg />
      <ProfileInfo />
      <button className={styles.profileEdit}>프로필 수정</button>
      <StudyTime />
      <ProfileBtns />
    </div>
  );
};

export default Profile;
