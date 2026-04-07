import { LEVEL_CONFIG, TEST_LEVEL } from "@/constants/levels";
import { useMemo } from "react";

/**
 * A custom hook that provides level-specific game parameters based on a difficulty value.
 *
 * @param {number} level - The difficulty level, typically a float between 0 and 1.
 * @returns An object with level-specific data like the level name, clue count, and score multiplier.
 */

const useLevel = (levelId: number) => {
  const levelData = useMemo(() => {
    const config = LEVEL_CONFIG[levelId] ?? TEST_LEVEL;
    return {
      levelString: config.name,
      clueCount: config.clues,
      scoreMultiply: config.scoreMultiplier,
      difficulty: config.difficulty,
    };
  }, [levelId]);
  return levelData;
};

export default useLevel;
