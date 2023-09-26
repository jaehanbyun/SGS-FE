import styles from "./Member.module.css";
import useTimer from "../../../../hooks/useTimer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Member = ({ userId, participant, idx }) => {
  const master = useSelector((state) => state.selectedUserInfo.master);
  const formattedTime = useTimer(
    participant.studyTime,
    participant.timer,
    participant.onTime
  );
  const [showTime, setShowTime] = useState("");
  useEffect(() => {
    setShowTime(formattedTime);
  }, [participant, formattedTime]);

  return (
    <>
      {showTime && (
        <li className={styles.li}>
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
