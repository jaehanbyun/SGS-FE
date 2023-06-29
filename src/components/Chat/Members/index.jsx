import React from "react";
import styles from "./Members.module.css";
import Member from "./Member";

const Members = ({ participants }) => {
  return (
    <div className={styles.members}>
      <ul className={styles.ul}>
        {Object.entries(participants).map(([key, value], idx) => (
          <Member key={key} userId={key} participant={value} idx={idx} />
        ))}
      </ul>
    </div>
  );
};

export default Members;
