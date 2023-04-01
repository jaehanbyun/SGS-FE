import React from "react";
import { useSelector } from "react-redux";
import Button from "../../Button";
import styles from "./RoomCreateModal.module.css";

const channelName = ["home", "초등", "중등", "고등", "대학생", "취업준비"];

const RoomCreateModal = ({ setModalOpen }) => {
  const { selectedChannel } = useSelector((state) => state);
  const onClick = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.top}>
            <p>채팅방 생성</p>
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={styles.contents}>
            <ul>
              <li>
                <p className={styles.option}>채널</p>
                <p className={styles.channel}>{channelName[selectedChannel]}</p>
              </li>
              <li>
                <p className={styles.option}>채팅방 제목</p>
                <div className={styles.title}>
                  <input type="text" placeholder="제목을 입력하세요." />
                </div>
              </li>
              <li>
                <p className={styles.option}>참여 인원</p>
                <div className={styles.participant}>
                  <select name="participant">
                    <option value="three">3</option>
                    <option value="five">5</option>
                    <option value="seven">7</option>
                    <option value="ten">10</option>
                  </select>
                  명
                </div>
              </li>
              <li>
                <p className={styles.option}>방 구분</p>
                <div className={styles.separation}>
                  <label htmlFor="public">공개</label>
                  <input
                    type="radio"
                    id="public"
                    value="public"
                    name="separation"
                  />
                  <label htmlFor="private">비공개 그룹</label>
                  <input
                    type="radio"
                    id="private"
                    value="private"
                    name="separation"
                  />
                </div>
              </li>
            </ul>
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

export default RoomCreateModal;
