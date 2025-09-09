import { useEffect, useState } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval = 0;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!timerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, timerRunning]);

  const formatTimer = (timer: number) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    return `${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  };

  return { timer, setTimer, timerRunning, setTimerRunning, formatTimer };
};

export default useTimer;
