import styles from "./Member.module.css";
import useTimer from "../../../../hooks/useTimer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Member = ({ userId, participant, idx }) => {
  const {
    selectedUserInfo: { master },
  } = useSelector((state) => state);
  const formattedTime = useTimer(
    participant.studyTime,
    participant.timer,
    participant.onTime
  );
  const [showTime, setShowTime] = useState("");
  useEffect(() => {
    setShowTime(formattedTime);
  }, [participant, formattedTime]);

  const setColor = (idx) => {
    if (idx === 0) return "#DDC365";
    else if (idx === 1) return "#B7B7B7";
    else if (idx === 2) return "#CA994F";
  };
  return (
    <>
      {showTime && (
        <li className={styles.li} style={{ background: setColor(idx) }}>
          <img src="/images/profile.svg" alt="profile" />
          <div className={styles.userId}>{userId}</div>
          <div className={styles.studyTime}>{showTime}</div>
          {userId === master && <img src="/images/star.svg" alt="master" />}
        </li>
      )}
    </>
  );
};

export default Member;
