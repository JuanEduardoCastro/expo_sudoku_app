import { LEVEL_CONFIG, TEST_LEVEL } from "@/constants/levels";
import { useMemo } from "react";

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
