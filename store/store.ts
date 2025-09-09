import { Board } from "@/app/Game";
import { create } from "zustand";
import { UseNotificationMessageState } from "./types";

export const useNotificationMessageStore = create<UseNotificationMessageState>((set) => ({
  notification: {
    message: null,
    type: null,
  },
  setNotification: (notification) => set({ notification }),
  resetNotification: () => set({ notification: { message: null, type: null } }),
}));

export interface BoardState {
  boardstored: Board;
  solutionBoardStored: Board;
  level: number;
  setBoardStored: (board: Board) => void;
  setSolutionBoardStored: (solutionBoard: Board) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  boardstored: [],
  solutionBoardStored: [],
  level: 0,
  setBoardStored: (boardstored) => set({ boardstored }),
  setSolutionBoardStored: (solutionBoardStored) => set({ solutionBoardStored }),
  setLevel: (level: number) => set({ level }),
  resetBoard: () => set({ boardstored: [], solutionBoardStored: [], level: 0 }),
}));
