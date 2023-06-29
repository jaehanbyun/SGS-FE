import moment from "moment";
import { useEffect, useState } from "react";

const useTimer = (initialTime, timerState) => {
  const startingTime = moment.duration(initialTime);
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
