import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileModal.module.css";
import axios from "../../../api/core";

const ProfileModal = ({ setOpen }) => {
  const ref = useRef();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get("/auth/get-profile");
      setProfile(res.data.data);
    };
    getProfile();
  }, []);
  const onClick = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>프로필</p>
            <img
              src={
                profile.profileImage ? profile.profileImage : "/images/exit.svg"
              }
              alt="exit"
              onClick={onClick}
            />
          </div>
          <div className={`${styles.imageWrapper} ${styles.content}`}>
            <div className={styles.image}>
              <img src="/images/account_circle.svg" alt="profileImage" />
            </div>
          </div>
          <div className={`${styles.nickname} ${styles.content}`}>
            <p>닉네임</p>
            <p>{profile.name ? profile.name : "익명"}</p>
          </div>
          <div className={`${styles.email} ${styles.content}`}>
            <p>이메일</p>
            <p>{profile.email}</p>
          </div>
          <div className={`${styles.site} ${styles.content}`}>
            <p>웹사이트</p>
            <p>{profile.url ? profile.url : "웹사이트 주소가 없어요"}</p>
          </div>
          <div className={`${styles.introduce} ${styles.content}`}>
            <p>소개</p>
            <pre>
              {profile.description ? profile.description : "소개가 없어요"}
            </pre>
          </div>
          <div className={styles.bottom}>
            <h5>평균 공부 시간</h5>
            <p>{profile.studyTime ? profile.studyTime : "00:00:00"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
