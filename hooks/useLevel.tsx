import { useEffect, useState } from "react";

/**
 * A custom hook that provides level-specific game parameters based on a difficulty value.
 *
 * @param {number} level - The difficulty level, typically a float between 0 and 1.
 * @returns An object with level-specific data like the level name, clue count, and score multiplier.
 */

const useLevel = (level: number) => {
  /** The string representation of the difficulty level (e.g., "Easy", "Hard"). */
  const [levelString, setLevelString] = useState<string | null>(null);
  /** The number of available clues for the current level. */
  const [clueCount, setClueCount] = useState<number | null>(null);
  /** The base score multiplier for the current level. */
  const [scoreMultiply, setScoreMultiply] = useState<number>(0);

  /**
   * Effect to set the level parameters whenever the `level` prop changes.
   */
  useEffect(() => {
    switch (level) {
      case 0.05:
        setLevelString("For test");
        setClueCount(3);
        setScoreMultiply(10);
        break;
      case 0.54:
        setLevelString("Easy");
        setClueCount(3);
        setScoreMultiply(24);
        break;
      case 0.6:
        setLevelString("Medium");
        setClueCount(2);
        setScoreMultiply(40);
        break;
      case 0.65:
        setLevelString("Hard");
        setClueCount(1);
        setScoreMultiply(80);
        break;
      case 0.7:
        setLevelString("Expert");
        setClueCount(1);
        setScoreMultiply(150);
        break;
      default:
        break;
    }
  }, []);

  return { levelString, setLevelString, clueCount, setClueCount, scoreMultiply, setScoreMultiply };
};

export default useLevel;
