import { create } from "zustand";
import { UseBoardStateTypes, UseGameScoresTypes, UseNotificationMessageStateTypes } from "./types";

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

/**
 * Zustand store for managing player scores and game statistics.
 * Details of the most recently completed game.
 * Aggregated statistics across all games played.
 * An array of score statistics, broken down by difficulty level.
 * Setters and reset for data for the most recently completed game.
 */
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
    }),
}));
