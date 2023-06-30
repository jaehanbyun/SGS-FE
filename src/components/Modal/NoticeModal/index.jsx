import React, { useRef, useState } from "react";
import styles from "./NoticeModal.module.css";
import { useOnClickOutside } from "../../../hooks";
import axios from "../../../api/core";

const NoticeModal = ({ setModifyModalOpen, roomId }) => {
  const [notice, setNotice] = useState("");

  const ref = useRef();

  const closeModal = () => {
    setModifyModalOpen(false);
  };

  const modifyNotice = async () => {
    try {
      const res = await axios.patch("/room/group", {
        roomType: true,
        roomId: roomId,
        roomNotice: notice,
      });
      console.log(res);
      setModifyModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useOnClickOutside(ref, () => {
    setModifyModalOpen(false);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>공지사항 수정</p>
            <img src="/images/exit.svg" alt="exit" onClick={closeModal} />
          </div>
          <div className={styles.contents}>
            <p>공지사항 입력</p>
            <div className={styles.code}>
              <input
                type="text"
                placeholder="공지사항을 입력하세요."
                value={notice}
                onChange={(e) => {
                  setNotice(e.target.value);
                }}
              />
              <button onClick={modifyNotice}>수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
