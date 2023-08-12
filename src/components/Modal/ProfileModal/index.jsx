import React, { useRef } from "react";
import styles from "./ProfileModal.module.css";

const ProfileModal = ({ setOpen }) => {
  const ref = useRef();
  const onClick = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>프로필</p>
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={`${styles.imageWrapper} ${styles.content}`}>
            <div className={styles.image}>
              <img src="images/account_circle.svg" alt="profileImage" />
            </div>
          </div>
          <div className={`${styles.nickname} ${styles.content}`}>
            <p>닉네임</p>
            <p>홍길동</p>
          </div>
          <div className={`${styles.email} ${styles.content}`}>
            <p>이메일</p>
            <p>abcd1234@gmail.com</p>
          </div>
          <div className={`${styles.site} ${styles.content}`}>
            <p>웹사이트</p>
            <p>https://github.com/</p>
          </div>
          <div className={`${styles.introduce} ${styles.content}`}>
            <p>소개</p>
            <pre>
              안녕하세요.
              <br />
              부산대학교 재학생입니다.
            </pre>
          </div>
          <div className={styles.bottom}>
            <h5>평균 공부 시간</h5>
            <p>03:10:05</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
