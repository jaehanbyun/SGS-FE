import React, { useCallback, useState } from "react";
import DateSelector from "./DateSelector";
import styles from "./Calendar.module.css";
import Button from "../../../Button";
import moment from "moment";
moment.locale("ko");

export default function Calendar() {
  const [aps, setAps] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [date, setDate] = useState(new Date());
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
    // if (start === "" || end === "" || plan === "") {
    //   alert("시간과 계획을 빠짐없이 입력해주세요");
    //   return;
    // }
    const newAp = `${moment(date).format(
      "YY년 MM월 DD일"
    )} ${start} ~ ${end} ${plan}`;
    setAps([...aps, newAp]);

    setHighlighted([...highlighted, date]);
  };

  const isDayHighlighted = useCallback(
    (day) => {
      const thatDay = moment(day).format("l");
      const filteredDate = highlighted.find(
        (h) => moment(h).format("l") === thatDay
      );
      if (filteredDate) {
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
          initialDate={moment(new Date())}
          onDateChange={handleDateChange}
          isDayHighlighted={isDayHighlighted}
        />
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
              console.log(e.target.value);
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
      <ol>
        {aps.map((ap) => (
          <li key={ap}>{ap}</li>
        ))}
      </ol>
    </div>
  );
}
