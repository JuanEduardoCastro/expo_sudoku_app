import { useEffect, useState } from "react";

/**
 * A custom hook to manage a game timer.
 * It tracks elapsed time, provides a formatted time string, and can be started or stopped.
 * It also calculates a time-based multiplier for scoring.
 *
 * @returns An object containing timer state and control functions.
 */

const useTimer = () => {
  /** The elapsed time in seconds. */
  const [timer, setTimer] = useState<number>(0);
  /** A boolean indicating if the timer is currently running. */
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  /** A multiplier that increases as time passes, used to adjust scoring. */
  const [timerMultiply, setTimerMultiply] = useState<number | null>(0);

  /**
   * Effect to start or stop the timer interval based on the `timerRunning` state.
   */
  useEffect(() => {
    let interval = 0;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        /**
         * Effect to update the time-based score multiplier at set intervals (e.g., every 30 seconds).
         */
        if (interval % 30 === 0) {
          setTimerMultiply(timerMultiply === null ? 0 : timerMultiply + 1);
        }
      }, 1000);
    } else if (!timerRunning && timer !== 0) {
      // Cleanup function to clear the interval when the component unmounts or `timerRunning` changes.
      clearInterval(interval);
    }

    // Cleanup function to clear the interval when the component unmounts or `timerRunning` changes.
    return () => clearInterval(interval);
  }, [timer, timerRunning]);

  /**
   * Formats a time in seconds into a "MM:SS" string.
   * @param {number | null} timeInSeconds - The total seconds to format.
   * @returns {string} The formatted time string (e.g., "01:30").
   */
  const formatTimer = (timer: number) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    return `${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  };

  return { timer, setTimer, timerRunning, setTimerRunning, formatTimer, timerMultiply };
};

export default useTimer;
