import styles from "./Member.module.css";
import useTimer from "../../../../hooks/useTimer";
import { useEffect, useState } from "react";
const Member = ({ userId, participant, idx }) => {
  const formattedTime = useTimer(participant.studyTime, participant.timer);
  const [showTime, setShowTime] = useState("00:00:00");
  useEffect(() => {
    setShowTime(formattedTime);
  }, [participant, formattedTime]);

  const setColor = (idx) => {
    if (idx === 0) return "#DDC365";
    else if (idx === 1) return "#B7B7B7";
    else if (idx === 2) return "#CA994F";
  };
  return (
    <li className={styles.li} style={{ background: setColor(idx) }}>
      <img src="/image/profile" alt="profile" />
      <div className={styles.userId}>{userId}</div>
      <div className={styles.studyTime}>{showTime}</div>
    </li>
  );
};

export default Member;
