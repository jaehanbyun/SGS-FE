import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "../../Button";
import Chart from "./Chart";
import styles from "./ChartModal.module.css";
import { offSelectedProfileIcon } from "../../../redux/selectedProfileIcon/slice";
import { useOnClickOutside } from "../../../hooks";

const ChartModal = () => {
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
            <p>공부 시간</p>
            <Button
              width={"60px"}
              height={"30px"}
              text={"일별"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={() => {}}
            />
            <Button
              width={"60px"}
              height={"30px"}
              text={"주별"}
              backgroundColor={"#535353"}
              color={"#fff"}
              fontsize={18}
              onClick={() => {}}
            />
            <img src="images/exit.svg" alt="exit" onClick={onClick} />
          </div>
          <div className={styles.contents}>
            <div className={styles.chart}>
              <Chart />
            </div>
            <div className={styles.time}>
              <h5>평균 공부 시간</h5>
              <p>03:10:05</p>
              <div className={styles.prev}>&lt;</div>
              <div className={styles.next}>&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
