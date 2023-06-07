import React, { useRef } from "react";
import styles from "./RoomInfoModal.module.css";

const RoomInfoModal = ({ setRoomInfoModalOpen }) => {
  const onClick = () => {
    setRoomInfoModalOpen(false);
  };
  const ref = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={styles.contents}></div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoModal;
