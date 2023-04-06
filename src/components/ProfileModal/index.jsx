import React from "react";
import Button from "../Button";
import styles from "./ProfileModal.module.css";

const ProfileModal = ({ setProfileModalOpen }) => {
  const onClick = () => {
    setProfileModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.top}>
            <p>프로필 수정</p>
          </div>
          <div className={`${styles.imageWrapper} ${styles.content}`}>
            <div className={styles.image}>
              <img src="images/account_circle.svg" alt="profile-image" />
            </div>
            <div className={styles.btn}>
              <button>사진 올리기</button>
            </div>
          </div>
          <div className={`${styles.nickname} ${styles.content}`}>
            <p>닉네임</p>
            <input type="text" />
          </div>
          <div className={`${styles.email} ${styles.content}`}>
            <p>이메일</p>
            <p>abcd1234@gmail.com</p>
          </div>
          <div className={`${styles.site} ${styles.content}`}>
            <p>웹사이트</p>
            <input type="text" />
          </div>
          <div className={`${styles.introduce} ${styles.content}`}>
            <p>소개</p>
            <textarea cols="30" rows="6" />
          </div>
          <div className={styles.bottom}>
            <Button
              width={100}
              height={40}
              text={"확인"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={onClick}
            />
            <Button
              width={100}
              height={40}
              text={"취소"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
