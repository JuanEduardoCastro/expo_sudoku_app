import { useEffect, useState } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerMultiply, setTimerMultiply] = useState<number | null>(0);

  useEffect(() => {
    let interval: number | undefined = undefined;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    // TODO: Cleanup function to clear the interval when the component unmounts or `timerRunning` changes.
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (timer > 0 && timer % 30 === 0) {
      setTimerMultiply((prev) => (prev === null ? 1 : prev + 1));
    }
  }, [timer]);

  const formatTimer = (timer: number) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    return `${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  };

  return { timer, setTimer, timerRunning, setTimerRunning, formatTimer, timerMultiply };
};

export default useTimer;
