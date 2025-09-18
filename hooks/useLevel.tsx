import { useMemo } from "react";

/**
 * A custom hook that provides level-specific game parameters based on a difficulty value.
 *
 * @param {number} level - The difficulty level, typically a float between 0 and 1.
 * @returns An object with level-specific data like the level name, clue count, and score multiplier.
 */

const useLevel = (level: number) => {
  /**
   * Memoizes the level data to avoid recalculation on every render.
   * The data is only recomputed when the `level` prop changes.
   */
  const levelData = useMemo(() => {
    let levelString = "Unknown";
    let clueCount = 0;
    let scoreMultiply = 0;
    switch (level) {
      case 0.05:
        levelString = "For test";
        clueCount = 3;
        scoreMultiply = 10;
        break;
      case 0.54:
        levelString = "Easy";
        clueCount = 3;
        scoreMultiply = 24;
        break;
      case 0.6:
        levelString = "Medium";
        clueCount = 2;
        scoreMultiply = 40;
        break;
      case 0.65:
        levelString = "Hard";
        clueCount = 1;
        scoreMultiply = 80;
        break;
      case 0.7:
        levelString = "Expert";
        clueCount = 1;
        scoreMultiply = 150;
        break;
      default:
        break;
    }
    return { levelString, clueCount, scoreMultiply };
  }, [level]);

  return levelData;
};

export default useLevel;
