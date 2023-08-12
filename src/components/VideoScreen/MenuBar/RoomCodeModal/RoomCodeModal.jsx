import React, { useState } from "react";
import styles from "./RoomCodeModal.module.css";
import Button from "../../../Button";
const RoomCodeModal = ({ code, setCodeModalOpen }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async (text) => {
    setCopied(true);
    await navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.top}>
            <p>초대코드</p>
            <img
              onClick={() => setCodeModalOpen(false)}
              src="/images/exit.svg"
              alt="exit"
            />
          </div>
          <div className={styles.contents}>
            <div className={styles.codeCopy}>
              <input className={styles.input} type="text" value={code} />
              <img
                className={styles.img}
                src="/images/copy.svg"
                alt="copy"
                onClick={() => copyToClipboard(code)}
              />
            </div>

            {copied && "  ✅클립보드에 복사됨"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCodeModal;
