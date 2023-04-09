import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../../hooks";
import { offSelectedProfileIcon } from "../../../redux/selectedProfileIcon/slice";
import Calendar from "./Calendar";
import styles from "./CalendarModal.module.css";
export default function CalendarModal() {
  const ref = useRef();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(offSelectedProfileIcon());
  };
  useOnClickOutside(ref, () => {
    dispatch(offSelectedProfileIcon());
  });
  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <div className={styles.top}>
            <p>스케쥴 등록</p>
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={styles.contents}>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
