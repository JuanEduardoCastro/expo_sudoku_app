import { create } from "zustand";
import { UseBoardStateTypes, UseGameScoresTypes, UseNotificationMessageStateTypes } from "./types";

export const useNotificationMessageStore = create<UseNotificationMessageStateTypes>((set) => ({
  notification: {
    message: null,
    type: null,
  },
  setNotification: (notification) => set({ notification }),
  resetNotification: () => set({ notification: { message: null, type: null } }),
}));

export const useBoardStore = create<UseBoardStateTypes>((set) => ({
  boardstored: [],
  solutionBoardStored: [],
  level: 0,
  errors: 0,
  score: 0,
  setBoardStored: (boardstored) => set({ boardstored }),
  setSolutionBoardStored: (solutionBoardStored) => set({ solutionBoardStored }),
  setLevel: (level: number) => set({ level }),
  setErrors: (errors: number) => set({ errors }),
  setScore: (score: number) => set({ score }),
  resetBoard: () =>
    set({ boardstored: [], solutionBoardStored: [], level: 0, errors: 0, score: 0 }),
}));

export const useGameScoresStore = create<UseGameScoresTypes>((set) => ({
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
      level: 0,
      maxPoints: 0,
      totalGames: 0,
      besttime: 0,
      streak: 0,
    },
  ],
  setGameScore: (gameScore) => set({ gameScore }),
  setGlobalScores: (globalScores) => set({ globalScores }),
  setScoresByLevels: (scoresByLevels) => set({ scoresByLevels }),
  resetGameScores: () =>
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
          level: 0,
          maxPoints: 0,
          totalGames: 0,
          besttime: 0,
          streak: 0,
        },
      ],
    }),
}));
