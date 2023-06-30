import React, { useRef, useState } from "react";
import styles from "./GroupJoinModal.module.css";
import { useOnClickOutside } from "../../../hooks";
import axios from "../../../api/core";
import { useDispatch } from "react-redux";
import { setSelectedUserState } from "../../../redux/selectedUserState/slice";
import { setSelectedUserInfo } from "../../../redux/selectedUserInfo/slice";

const GroupJoinModal = ({ setGroupModalOpen }) => {
  const ref = useRef();

  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const closeModal = () => {
    setGroupModalOpen(false);
  };

  const joinGroup = async () => {
    try {
      const res = await axios.post("room/group/private", {
        roomCode: "4ef44023-c2ec-47aa-bfd3-75698242ff4b",
      });
      console.log(res);
      alert("그룹에 가입 되었습니다.");
    } catch (err) {
      alert("잘못된 코드입니다.");
      console.log(err);
    }
    setGroupModalOpen(false);
  };

  useOnClickOutside(ref, () => {
    setGroupModalOpen(false);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>스터디 그룹 가입</p>
            <img src="images/exit.svg" alt="exit" onClick={closeModal} />
          </div>
          <div className={styles.contents}>
            <p>코드 입력</p>
            <div className={styles.code}>
              <input
                type="text"
                placeholder="코드를 입력하세요."
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <button onClick={joinGroup}>가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupJoinModal;
