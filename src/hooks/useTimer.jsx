import moment from "moment";
import { useEffect, useState } from "react";

const useTimer = (initialTime, timerState, onTime = "") => {
  const startingTime = timerState
    ? moment.duration(
        moment()
          .add(moment.duration(initialTime))
          .diff(moment(onTime, "HH:mm:ss"))
      )
    : moment.duration(initialTime);
  const [elapsedTime, setElapsedTime] = useState(startingTime.asSeconds());

  useEffect(() => {
    let interval;
    if (timerState) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerState]);

  const formattedTime = moment.utc(elapsedTime * 1000).format("HH:mm:ss");

  return formattedTime;
};
export default useTimer;
