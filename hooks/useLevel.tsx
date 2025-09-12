import { useEffect, useState } from "react";

const useLevel = (level: number) => {
  const [levelString, setLevelString] = useState<string | null>(null);
  const [clueCount, setClueCount] = useState<number | null>(null);
  const [scoreMultiply, setScoreMultiply] = useState<number>(0);

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
