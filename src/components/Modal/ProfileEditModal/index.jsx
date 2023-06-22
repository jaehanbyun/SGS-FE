import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useOnClickOutside } from "../../../hooks";
import Button from "../../Button";
import styles from "./ProfileEditModal.module.css";
import axios from "../../../api/core";

const ProfileEditModal = ({ setProfileModalOpen }) => {
  const ref = useRef();
  const fileRef = useRef();
  const { selectedUserInfo } = useSelector((state) => state);
  const [info, setInfo] = useState(selectedUserInfo);

  const onEdit = async () => {
    try {
      //console.log(info.name, info.description, selectedUserInfo.id);
      const res = await axios.patch(`/auth/modify-profile`, {
        id: selectedUserInfo.id,
        name: info.name,
        profileImage: info.profileImage,
        description: info.description,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onExit = () => {
    setProfileModalOpen(false);
  };
  const onUploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setInfo({ ...info, profileImage: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useOnClickOutside(ref, () => {
    setProfileModalOpen(false);
  });
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>프로필 수정</p>
          </div>
          <div className={`${styles.imageWrapper} ${styles.content}`}>
            <div className={styles.image}>
              <img src={`${info.profileImage}`} alt="profileImage" />
            </div>
            <div className={styles.btn}>
              <button>
                <label>
                  이미지 업로드
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={onUploadImage}
                  />
                </label>
              </button>
            </div>
          </div>
          <div className={`${styles.nickname} ${styles.content}`}>
            <p>닉네임</p>
            <input
              type="text"
              value={info.name}
              onChange={(e) => {
                setInfo({ ...info, name: e.target.value });
              }}
            />
          </div>
          <div className={`${styles.email} ${styles.content}`}>
            <p>이메일</p>
            <p>{info.email}</p>
          </div>
          <div className={`${styles.site} ${styles.content}`}>
            <p>웹사이트</p>
            <input type="text" />
          </div>
          <div className={`${styles.introduce} ${styles.content}`}>
            <p>소개</p>
            <textarea
              cols="30"
              rows="6"
              value={info.description}
              onChange={(e) => {
                setInfo({ ...info, description: e.target.value });
              }}
            />
          </div>
          <div className={styles.bottom}>
            <Button
              width={"100px"}
              height={"40px"}
              text={"확인"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={onEdit}
            />
            <Button
              width={"100px"}
              height={"40px"}
              text={"취소"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={onExit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
