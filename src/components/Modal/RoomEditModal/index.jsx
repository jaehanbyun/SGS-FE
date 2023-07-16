import React, { useRef, useState } from "react";
import styles from "./RoomEditModal.module.css";
import Button from "../../Button";
import { useSelector } from "react-redux";
import { useOnClickOutside } from "../../../hooks";
import axios from "../../../api/core";

const channelName = ["home", "초등", "중등", "고등", "대학생", "취업준비"];

const RoomEditModal = ({ roomId, setRoomEditModalOpen }) => {
  const { selectedChannel } = useSelector((state) => state);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPublic, setIsPublic] = useState("public");
  const [maxUser, setMaxUser] = useState(3);

  const ref = useRef();
  const roomNameRef = useRef();

  const editRoom = async () => {
    try {
      const roomName = roomNameRef.current.value;
      if (roomName === "") {
        setIsEmpty(true);
        return;
      }
      let age;
      switch (selectedChannel) {
        case 1:
          age = "ELEMENTARY_SCHOOL";
          break;
        case 2:
          age = "MIDDLE_SCHOOL";
          break;
        case 3:
          age = "HIGH_SCHOOL";
          break;
        case 4:
          age = "UNIVERSITY";
          break;
        case 5:
          age = "BUSINESS";
          break;
        default:
          break;
      }

      const room = {
        roomType: isPublic === "public" ? true : false,
        roomName,
        maxUser,
        roomChannel: age,
      };

      const res = await axios.put("/room/group", room);
      setRoomEditModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setRoomEditModalOpen(false);
  };

  const handlePublicity = (e) => {
    setIsPublic(e.target.value);
  };
  const handleMaxUser = (e) => {
    setMaxUser(e.target.value);
  };
  useOnClickOutside(ref, () => {
    setRoomEditModalOpen(false);
  });
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>채팅방 수정</p>
            <img src="images/exit.svg" alt="exit" onClick={closeModal} />
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
                  <input
                    ref={roomNameRef}
                    type="text"
                    placeholder="제목을 입력하세요."
                    style={{ border: !isEmpty ? "" : "1px solid red" }}
                  />
                  {isEmpty && (
                    <div style={{ color: "red", marginTop: "1px" }}>
                      방제목을 입력해주세요.
                    </div>
                  )}
                </div>
              </li>
              <li>
                <p className={styles.option}>참여 인원</p>
                <div className={styles.participant}>
                  <select
                    name="participant"
                    onChange={handleMaxUser}
                    value={maxUser}
                  >
                    <option value="three">3</option>
                    <option value="five">5</option>
                    <option value="seven">7</option>
                    <option value="ten">10</option>
                  </select>
                  명
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.bottom}>
            <Button
              width={"100px"}
              height={"40px"}
              text={"확인"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={editRoom}
            />
            <Button
              width={"100px"}
              height={"40px"}
              text={"취소"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomEditModal;
