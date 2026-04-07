import { create } from "zustand";
import { clearAllData, globalStatsService, levelStatsService } from "./dbServices";
import { UseBoardStateTypes, UseGameScoresTypes, UseNotificationMessageStateTypes } from "./types";

export const useGameScoresStore = create<UseGameScoresTypes>((set: any) => ({
  gameScore: {
    errorCount: 0,
    points: 0,
    level: 0,
    time: 0,
  },
  globalScores: {
    maxPoints: 0,
    totalGames: 0,
    perfectGames: 0,
    goodGames: 0,
    completedGames: 0,
    totalTimePlay: 0,
  },
  scoresByLevels: [
    {
      level: 1,
      name: "Easy",
      maxPoints: 0,
      totalGames: 0,
      besttime: 0,
      streak: 0,
    },
    {
      level: 2,
      name: "Medium",
      maxPoints: 0,
      totalGames: 0,
      besttime: 0,
      streak: 0,
    },
    {
      level: 3,
      name: "Hard",
      maxPoints: 0,
      totalGames: 0,
      besttime: 0,
      streak: 0,
    },
    {
      level: 4,
      name: "Expert",
      maxPoints: 0,
      totalGames: 0,
      besttime: 0,
      streak: 0,
    },
  ],
  setGameScore: (gameScore) => set({ gameScore }),
  setGlobalScores: (globalScores) => set({ globalScores }),
  setScoresByLevels: (scoresByLevels) => set({ scoresByLevels }),
  resetGameScores: async () => {
    await clearAllData();
    set({
      gameScore: {
        errorCount: 0,
        points: 0,
        level: 0,
        time: 0,
      },
      globalScores: {
        maxPoints: 0,
        totalGames: 0,
        perfectGames: 0,
        goodGames: 0,
        completedGames: 0,
        totalTimePlay: 0,
      },
      scoresByLevels: [
        {
          level: 1,
          name: "Easy",
          maxPoints: 0,
          totalGames: 0,
          besttime: 0,
          streak: 0,
        },
        {
          level: 2,
          name: "Medium",
          maxPoints: 0,
          totalGames: 0,
          besttime: 0,
          streak: 0,
        },
        {
          level: 3,
          name: "Hard",
          maxPoints: 0,
          totalGames: 0,
          besttime: 0,
          streak: 0,
        },
        {
          level: 4,
          name: "Expert",
          maxPoints: 0,
          totalGames: 0,
          besttime: 0,
          streak: 0,
        },
      ],
    });
  },
  loadFromDatabase: async () => {
    const globalStats = await globalStatsService.get();
    const levelStats = await levelStatsService.getAll();

    if (globalStats) {
      set({
        globalScores: {
          maxPoints: globalStats.maxPoints,
          totalGames: globalStats.totalGames,
          perfectGames: globalStats.perfectGames,
          goodGames: globalStats.goodGames,
          completedGames: globalStats.completedGames,
          totalTimePlay: globalStats.totalTimePlay,
        },
      });
    }

    if (levelStats.length > 0) {
      set({
        scoresByLevels: levelStats.map((stat) => ({
          level: stat.level,
          name: stat.name,
          maxPoints: stat.maxPoints,
          totalGames: stat.totalGames,
          besttime: stat.bestTime,
          streak: stat.currentStreak,
        })),
      });
    }
  },
}));

/**
 * Zustand store for managing in-app notifications.
 * The current notification object. Contains a message and a type (e.g., 'success', 'error').
 * Setter and reset of notifications.
 */
export const useNotificationMessageStore = create<UseNotificationMessageStateTypes>((set) => ({
  notification: {
    message: null,
    type: null,
  },
  setNotification: (notification) => set({ notification }),
  resetNotification: () => set({ notification: { message: null, type: null } }),
}));

/**
 * Zustand store for managing the state of the Sudoku game board.
 * Contains the initial generated board and the complete solution board.
 * @params level, factor, errors, score for the current game.
 * Setters and reset params.
 */
export const useBoardStore = create<UseBoardStateTypes>((set) => ({
  /**  */
  boardState: {
    boardStored: [],
    solutionBoardStored: [],
  },
  level: 0,
  factor: 0,
  errors: 0,
  score: 0,
  setBoardState: (boardState) => set({ boardState }),
  setLevel: (level: number) => set({ level }),
  setFactor: (factor: number) => set({ factor }),
  setErrors: (errors: number) => set({ errors }),
  setScore: (score: number) => set({ score }),
  resetBoard: () =>
    set({
      boardState: { boardStored: [], solutionBoardStored: [] },
      level: 0,
      factor: 0,
      errors: 0,
      score: 0,
    }),
}));
