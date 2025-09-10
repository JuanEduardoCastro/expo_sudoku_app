import { Board } from "@/app/Game";

export interface UseNotificationMessageStateTypes {
  notification: {
    message: string | null;
    type: "warning" | "error" | "success" | null;
  };
  setNotification: (notification: {
    message: string;
    type: "warning" | "error" | "success";
  }) => void;
}

export interface UseBoardStateTypes {
  boardstored: Board;
  solutionBoardStored: Board;
  level: number;
  errors: number;
  score: number;
  setBoardStored: (board: Board) => void;
  setSolutionBoardStored: (solutionBoard: Board) => void;
  setLevel: (level: number) => void;
  setErrors: (errors: number) => void;
  setScore: (score: number) => void;
}

export interface UseGameScoresTypes {
  gameScore: {
    errorCount: number;
    points: number;
    level: number;
    time: number;
  };
  globalScores: {
    maxPoints: number;
    totalGames: number;
    perfectGames: number;
    goodGames: number;
    completedGames: number;
    totalTimePlay: number;
  };
  scoresByLevels: ScoresLevels[];
  setGameScore: (gameScore: {
    errorCount: number;
    points: number;
    level: number;
    time: number;
  }) => void;
  setGlobalScores: (globalScores: {
    maxPoints: number;
    totalGames: number;
    perfectGames: number;
    goodGames: number;
    completedGames: number;
    totalTimePlay: number;
  }) => void;
  setScoresByLevels: (scoresByLevels: ScoresLevels[]) => void;
}

interface ScoresLevels {
  level: number;
  name: string;
  maxPoints: number;
  totalGames: number;
  besttime: number;
  streak: number;
}
