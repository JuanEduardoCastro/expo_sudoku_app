import { useGameScoresStore } from "@/store/store_zustand";

export const ROW_BONUS_MULTIPLAYER = 10;
export const COL_BONUS_MULTIPLAYER = 10;
export const GRID_BONUS_MULTIPLAYER = 10;

export const ERROR_PENALTY_MULTIPLAYER = 5;
export const CLUE_COST_MULTIPLAYER = 3;

export const setDumbGlobalScores = () => {
  if (__DEV__) {
    useGameScoresStore.getState().setGlobalScores({
      maxPoints: 12480,
      totalGames: 63,
      perfectGames: 18,
      goodGames: 44,
      completedGames: 63,
      totalTimePlay: 28493, // 8 hours in seconds
    });
    useGameScoresStore.getState().setScoresByLevels([
      { level: 1, name: "Easy", maxPoints: 4200, totalGames: 24, bestTime: 142, streak: 8 },
      { level: 2, name: "Medium", maxPoints: 7800, totalGames: 19, bestTime: 310, streak: 5 },
      { level: 3, name: "Hard", maxPoints: 11200, totalGames: 14, bestTime: 520, streak: 3 },
      { level: 4, name: "Expert", maxPoints: 12480, totalGames: 6, bestTime: 890, streak: 1 },
    ]);
  }
};
