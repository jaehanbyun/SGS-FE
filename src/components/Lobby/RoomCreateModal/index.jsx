import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../../../hooks";
import Button from "../../Button";
import styles from "./RoomCreateModal.module.css";
const channelName = ["home", "초등", "중등", "고등", "대학생", "취업준비"];

const RoomCreateModal = ({ setModalOpen }) => {
  const { selectedChannel } = useSelector((state) => state);
  const ref = useRef();
  const roomNameRef = useRef();
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPublic, setIsPublic] = useState("public");
  const [maxUser, setMaxUser] = useState(3);
  const createRoom = async () => {
    const roomName = roomNameRef.current.value;
    if (roomName === "") {
      setIsEmpty(true);
      return;
    }
    let age;
    switch (selectedChannel) {
      case 0:
        age = "ELEMENTARY_SCHOOL";
        break;
      case 1:
        age = "MIDDLE_SCHOOL";
        break;
      case 2:
        age = "HIGH_SCHOOL";
        break;
      case 3:
        age = "UNIVERSITY";
        break;
      case 4:
        age = "BUSINESS";
        break;
      default:
        break;
    }
    const roomCreate = {
      userId: "donu",
      roomType: isPublic === "public" ? true : false,
      roomName,
      maxUser,
      roomChannel: age,
    };

    await fetch("//localhost:8080/room/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomCreate),
    })
      .then((response) => response.json())
      .then((res) => {
        setModalOpen(false);
        navigate(`/main/${res.data.roomId}&${selectedChannel}&${roomName}`);
      })
      .catch((error) => console.log(error));

    // joinRoom("aa", roomName);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handlePublicity = (e) => {
    setIsPublic(e.target.value);
  };
  const handleMaxUser = (e) => {
    setMaxUser(e.target.value);
  };
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>채팅방 생성</p>
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
              <li>
                <p className={styles.option}>방 구분</p>
                <div className={styles.separation}>
                  <label htmlFor="public">공개</label>
                  <input
                    type="radio"
                    id="public"
                    value="public"
                    name="separation"
                    checked={isPublic === "public"}
                    onChange={handlePublicity}
                  />
                  <label htmlFor="private">비공개 그룹</label>
                  <input
                    type="radio"
                    id="private"
                    value="private"
                    name="separation"
                    checked={isPublic === "private"}
                    onChange={handlePublicity}
                  />
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
              onClick={createRoom}
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

export default RoomCreateModal;
