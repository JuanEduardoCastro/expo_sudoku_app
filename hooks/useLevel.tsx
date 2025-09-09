import { useEffect, useState } from "react";

const useLevel = (level: any) => {
  const [levelString, setLevelString] = useState<string | null>(null);
  const [clueCount, setClueCount] = useState<number | null>(null);

  useEffect(() => {
    switch (level) {
      case 0.05:
        setLevelString("For test");
        setClueCount(3);
        break;
      case 0.54:
        setLevelString("Easy");
        setClueCount(3);
        break;
      case 0.6:
        setLevelString("Medium");
        setClueCount(2);
        break;
      case 0.65:
        setLevelString("Hard");
        setClueCount(1);
        break;
      case 0.7:
        setLevelString("Expert");
        setClueCount(1);
        break;
      default:
        break;
    }
  }, []);

  return { levelString, setLevelString, clueCount, setClueCount };
};

export default useLevel;
