import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Chart from "./Chart";
import styles from "./ChartModal.module.css";
import { offSelectedProfileIcon } from "../../../redux/selectedProfileIcon/slice";
import { useOnClickOutside } from "../../../hooks";
import { getMonthlyStudyTime } from "../../../utils/studyTimes";

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const thisDate = today.getDate();
const years = Array.from({ length: 3 }, (_, i) => thisYear - i);
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const ChartModal = () => {
  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);
  const [studyTimes, setStudyTimes] = useState([]);
  const [studyDates, setStudyDates] = useState([]);
  const [avgStudyTime, setAvgStudyTime] = useState(0);

  const ref = useRef();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(offSelectedProfileIcon());
  };
  useOnClickOutside(ref, () => {
    dispatch(offSelectedProfileIcon());
  });
  useEffect(() => {
    const showMonthlyStudyTime = async () => {
      const res = await getMonthlyStudyTime(`${year}-${month}`);
      let tmp = 0;
      const tmpArr = res.map((time) => {
        const studyTime = time["studyTimeInt"] / 60;
        tmp += studyTime;
        return studyTime;
      });
      setAvgStudyTime(tmp / thisDate);
      setStudyTimes(tmpArr);
      setStudyDates(res.map((date) => date["date"].substr(5)));
    };
    showMonthlyStudyTime();
  }, [year, month]);

  return (
    <section className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={ref}>
          <header className={styles.top}>
            <p className={styles.title}>공부 시간</p>
            <section className={styles.dateSelector}>
              <select
                className={styles.year}
                onChange={(e) => setYear(e.target.value)}
                value={year}
              >
                {years.map((yyyy) => (
                  <option value={yyyy} key={yyyy}>
                    {yyyy}
                  </option>
                ))}
              </select>
              <select
                className={styles.month}
                onChange={(e) => setMonth(e.target.value)}
                value={month}
              >
                {months.map((mm) => (
                  <option value={mm} key={mm}>
                    {mm}
                  </option>
                ))}
              </select>
            </section>
            <img
              className={styles.close}
              src="images/exit.svg"
              alt="exit"
              onClick={onClick}
            />
          </header>

          <div className={styles.contents}>
            <div className={styles.chart}>
              <Chart studyTimes={studyTimes} studyDates={studyDates} />
            </div>
            <div className={styles.time}>
              <h5
                className={styles.avgStudyTime}
              >{`${month}월 평균 공부 시간`}</h5>
              <p>{`${parseInt(avgStudyTime)}시간 ${parseInt(
                (avgStudyTime - parseInt(avgStudyTime)) * 60
              )}분`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartModal;
