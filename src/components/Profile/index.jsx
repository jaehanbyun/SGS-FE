import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import styles from "./Profile.module.css";
import ProfileBtns from "./ProfileBtns";
import ProfileImg from "./ProfileImg";
import ProfileInfo from "./ProfileInfo";
import StudyTime from "./StudyTime";
import axios from "../../api/core";
import { setSelectedUserInfo } from "../../redux/selectedUserInfo/slice";

const Profile = React.memo(({ setProfileModalOpen, update }) => {
  const [studyTime, setStudyTime] = useState("00:00:00");
  const { selectedUserInfo } = useSelector((state) => state);
  const { name, email, profileImage, description } = selectedUserInfo;

  const dispatch = useDispatch();

  const onClick = () => {
    setProfileModalOpen(true);
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.get("/auth/get-profile");
      let { name, profileImage, description, email, studyTime, url } =
        res.data.data;
      if (name === null) {
        const ranNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        name = `익명#${ranNum}`;
      }
      if (profileImage === null) {
        profileImage = "/images/profile.svg";
      }
      studyTime ? setStudyTime(studyTime) : setStudyTime("00:00:00");

      console.log(selectedUserInfo);
      dispatch(
        setSelectedUserInfo({
          ...selectedUserInfo,
          name,
          email,
          profileImage,
          description,
          studyTime,
          url,
        })
      );
    } catch (err) {}
  };

  useEffect(() => {
    getUserInfo();
  }, [update]);

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
