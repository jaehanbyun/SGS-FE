import React, { useCallback, useState } from "react";
import DateSelector from "./DateSelector";
import styles from "./Calendar.module.css";
import Button from "../../../Button";
import moment from "moment";
moment.locale("ko");

export default function Calendar() {
  const [aps, setAps] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [date, setDate] = useState();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [plan, setPlan] = useState("");
  const handleDateChange = (date) => {
    const d = moment(date._d);
    const nd = d._i;
    setDate(nd);
  };
  const onChangePlan = (e) => {
    setPlan(e.target.value);
  };
  const addPlan = (e) => {
    e.preventDefault();
    const newAp = `${moment(date).format(
      "YY년 MM월 DD일"
    )} ${start} ~ ${end} ${plan}`;
    setAps([...aps, newAp]);
    setHighlighted([...highlighted, date]);
  };

  const isDayHighlighted = useCallback(
    (day) => {
      const thatDay = moment(day).format("l");
      const filteredClass = highlighted.find(
        (h) => moment(h).format("l") === thatDay
      );
      if (filteredClass) {
        return true;
      }
      return false;
    },
    [highlighted]
  );
  return (
    <div className={styles.container}>
      <div>
        <DateSelector
          initialDate={null}
          onDateChange={handleDateChange}
          isDayHighlighted={isDayHighlighted}
        />
        <ol>
          {aps.map((ap) => (
            <li key={ap}>{ap}</li>
          ))}
        </ol>
      </div>
      <form className={styles.form}>
        <div>
          <span>시작시간: </span>

          <input
            type="time"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <div>
          <span>종료시간: </span>
          <input
            type="time"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              console.log(typeof e.target.value);
            }}
          />
        </div>
        <input
          className={styles.input}
          onChange={onChangePlan}
          value={plan}
          type="text"
          placeholder="계획"
        />

        <Button
          text={"일정 등록 "}
          width={120}
          height={45}
          backgroundColor={"#ff7272"}
          color={"#fff"}
          onClick={addPlan}
        />
      </form>
    </div>
  );
}
