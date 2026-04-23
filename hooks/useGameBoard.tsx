import { Board, CellProps } from "@/app/Game";
import { GameBoardProps } from "@/components/grid/GameBoard";
import { SCHEMES } from "@/constants/colors";
import { getLevels, TEST_LEVEL } from "@/constants/levels";
import {
  CLUE_COST_MULTIPLAYER,
  COL_BONUS_MULTIPLAYER,
  ERROR_PENALTY_MULTIPLAYER,
  GRID_BONUS_MULTIPLAYER,
  ROW_BONUS_MULTIPLAYER,
} from "@/constants/scoring";
import { saveCompletedGame, savedGamesService } from "@/store/dbServices";
import {
  useBoardStore,
  useGameScoresStore,
  useNotificationMessageStore,
} from "@/store/store_zustand";
import { checkCol, checkGame, checkGrid, checkRow } from "@/utils/gameLogic";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";
import useHaptic from "./useHaptic";
import useLevel from "./useLevel";
import useLoadSound from "./useLoadSound";
import useTimer from "./useTimer";

const useGameBoard = ({
  generatedBoard,
  solution,
  level,
  initialTimer,
  initialClues,
}: GameBoardProps) => {
  const { onClickHapticHeavy, onGameCompleteHaptic } = useHaptic();
  const { playSound } = useLoadSound();
  const isMounted = useRef(false);
  const lastPlacedCell = useRef<CellProps | null>(null);
  const gameCompletedRef = useRef(false);
  const prevCompletedNumbers = useRef<Set<number>>(new Set());
  const cluetimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  const { notification, setNotification, resetNotification } = useNotificationMessageStore();
  const {
    score,
    setScore,
    errors,
    setErrors,
    resetBoard,
    factor,
    setFactor,
    setHasSavedGame,
    setSavedGameLevel,
  } = useBoardStore();

  const {
    timer,
    setTimer,
    timerRunning,
    setTimerRunning,
    formatTimer,
    timerMultiply,
    setTimerMultiply,
  } = useTimer();
  const { levelString, clueCount, scoreMultiply } = useLevel(level);

  const [remainingClues, setRemainingClues] = useState(initialClues ?? clueCount);
  const [noCluesModal, setNoCluesModal] = useState(false);

  const [gameCompleteModal, setGameCompleteModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [streakBrokeModal, setStreakBrokeModal] = useState(false);

  const [board, setBoard] = useState<Board>(generatedBoard);

  const [selectedCell, setSelectedCell] = useState<CellProps | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [rotatedCells, setRotatedCells] = useState<Set<string>>(new Set());
  const [rotate, setRotate] = useState<boolean>(false);

  const [clueCell, setClueCell] = useState<number | null>(null);
  const [activeNumber, setActiveNumber] = useState<number | null>(null);
  const [errorCell, setErrorCell] = useState<{ row: number; col: number } | null>(null);
  const [isNewScoreRecord, setIsNewScoreRecord] = useState(false);
  const [isNewTimeRecord, setIsNewTimeRecord] = useState(false);

  const levels = getLevels(SCHEMES);

  const solutionBoard = solution;

  const saveCurrentGame = useCallback(async () => {
    await savedGamesService.save({
      level,
      boardState: JSON.stringify(board),
      solutionState: JSON.stringify(solutionBoard),
      currentScore: score,
      currentError: errors,
      elapsedTime: timer,
      remainingClues: remainingClues,
    });
  }, [level, board, solutionBoard, score, errors, timer, remainingClues]);

  useEffect(() => {
    return () => {
      if (cluetimeoutRef.current) clearTimeout(cluetimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (initialTimer && initialTimer > 0) {
      setTimer(initialTimer);
      setTimerMultiply(Math.floor(initialTimer / 30));
    }
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background") {
        saveCurrentGame();
      }
    });

    return () => sub.remove();
  }, [saveCurrentGame]);

  useEffect(() => {
    if (!notification.message) return;
    const t = setTimeout(() => resetNotification(), 2000);
    return () => clearTimeout(t);
  }, [notification.message]);

  useEffect(() => {
    const raw = scoreMultiply - timerMultiply;
    setFactor(Math.max(1, raw));
  }, [timerMultiply, scoreMultiply]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (errors > 3) {
      setStreakBrokeModal(true);
    }
  }, [errors]);

  const completedNumbers = useMemo(() => {
    const counts: Record<number, number> = {};
    board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.value !== null) {
          counts[cell.value] = (counts[cell.value] ?? 0) + 1;
        }
      }),
    );
    const completed = new Set<number>();
    for (const [num, count] of Object.entries(counts)) {
      if (count === 9) completed.add(Number(num));
    }
    return completed;
  }, [board]);

  useEffect(() => {
    function checkCells() {
      const cell = lastPlacedCell.current;
      lastPlacedCell.current = null;

      if (cell !== null) {
        const rotateSelection = new Set<string>();
        let bonus = 0;

        if (checkRow(board, cell!.row)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${cell!.row},${i}`);
          }
          bonus += ROW_BONUS_MULTIPLAYER * factor;
          setRotate(true);
        }
        if (checkCol(board, cell!.col)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${i},${cell!.col}`);
          }
          bonus += COL_BONUS_MULTIPLAYER * factor;
          setRotate(true);
        }
        if (checkGrid(board, cell!.row, cell!.col)) {
          const startRow = Math.floor(cell!.row / 3) * 3;
          const startCol = Math.floor(cell!.col / 3) * 3;
          for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
              rotateSelection.add(`${row},${col}`);
            }
          }
          bonus += GRID_BONUS_MULTIPLAYER * factor;
          setRotate(true);
        }

        const newlyCompleted = [...completedNumbers].filter(
          (num) => !prevCompletedNumbers.current.has(num),
        );

        for (const num of newlyCompleted) {
          for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
              if (board[row][col].value === num) {
                rotateSelection.add(`${row},${col}`);
              }
            }
          }
          if (rotateSelection.size > 0) {
            setRotate(true);
          }
        }

        prevCompletedNumbers.current = new Set(completedNumbers);

        setRotatedCells(rotateSelection);

        if (bonus > 0) {
          // setScore(score! + bonus);
          return score + bonus;
        }
      }
    }

    const bonusScore = checkCells();
    const scoreAfterBonus = bonusScore ?? score;

    if (bonusScore !== undefined && bonusScore > 0) {
      setScore(bonusScore);
    }

    if (checkGame(board) && !gameCompletedRef.current) {
      gameCompletedRef.current = true;
      onGameCompleteHaptic();
      const computed = scoreAfterBonus + Math.floor(timer! * level);
      setFinalScore(computed);
      setScore(computed);

      setTimerRunning(false);
      setSelectedCell(null);
      setHighlightedCells(new Set());

      const allCells = new Set<string>();
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          allCells.add(`${r},${c}`);
        }
      }
      setRotatedCells(allCells);
      setRotate(true);

      if (level !== TEST_LEVEL.id) {
        const prevLevelStats = useGameScoresStore
          .getState()
          .scoresByLevels.find((score) => score.level === level);
        const newScoreRecod = computed > (prevLevelStats?.maxPoints ?? 0);
        const newTimeRecord =
          (prevLevelStats?.bestTime ?? 0) === 0 || timer! < (prevLevelStats?.bestTime ?? Infinity);
        setIsNewScoreRecord(newScoreRecod);
        setIsNewTimeRecord(newTimeRecord);

        saveCompletedGame({
          level: level,
          points: computed,
          timeSeconds: timer!,
          errorCount: errors,
        })
          .then(() => {
            __DEV__ && console.log("game saved to database");
            useGameScoresStore.getState().loadFromDatabase();
            savedGamesService.delete();
            setHasSavedGame(false);
            setSavedGameLevel(null);
          })
          .catch((error) => {
            __DEV__ && console.error("Error saving game:", error);
          });
      }
      setTimeout(() => setGameCompleteModal(true), 950);
    }
  }, [board, score, factor, timer, level, completedNumbers]);

  const handleCellPress = (cell: CellProps) => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
    // if (!cell.editable === true) return;

    if (selectedCell?.row === cell.row && selectedCell?.col === cell.col) {
      setSelectedCell(null);
      setHighlightedCells(new Set());
      return;
    }

    setSelectedCell(cell);

    setActiveNumber(cell.value ?? null);

    if (cell.value !== null) {
      setHighlightedCells(calculateSameNumberCells(cell, board));
    } else if (level < 3) {
      setHighlightedCells(calculateHighlightedCells(cell));
    } else {
      setHighlightedCells(new Set());
    }
    // if (cell.value !== null) {
    //   setActiveNumber(cell.value);
    // } else {
    //   setActiveNumber(null);
    // }
    // if (level < 3) {
    //   setHighlightedCells(calculateHighlightedCells(cell));
    //   setActiveNumber(null);
    // }
  };

  const calculateHighlightedCells = (cell: CellProps) => {
    const newHighlightedCells = new Set<string>();
    const { row, col } = cell;

    for (let i = 0; i < 9; i++) {
      newHighlightedCells.add(`${row},${i}`);
      newHighlightedCells.add(`${i},${col}`);
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        newHighlightedCells.add(`${r},${c}`);
      }
    }

    return newHighlightedCells;
  };

  const calculateSameNumberCells = (cell: CellProps, board: Board) => {
    const matched = new Set<string>();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === cell.value) {
          matched.add(`${row},${col}`);
        }
      }
    }
    return matched;
  };

  const handleClickNumberPad = (number: number) => {
    setActiveNumber(number);
    if (!selectedCell) {
      setNotification({
        message: "Select a cell first",
        type: "warning",
      });
      playSound();
      onClickHapticHeavy();
      return;
    } else {
      if (!selectedCell.editable) return;

      const checkNumberInCell = solutionBoard[selectedCell.row][selectedCell.col].value === number;
      // const checkNumberInCell = isValid(board, selectedCell!.row, selectedCell!.col, number);

      if (checkNumberInCell) {
        playSound();
        onClickHapticHeavy();
        const newBoard = board.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            rowIndex === selectedCell!.row && cellIndex === selectedCell!.col
              ? { ...cell, value: number, editable: false }
              : cell,
          ),
        );
        lastPlacedCell.current = selectedCell;

        setBoard(newBoard);
        if (cluetimeoutRef.current) {
          clearTimeout(cluetimeoutRef.current);
          cluetimeoutRef.current = null;
        }
        setClueCell(null);
        setScore(score! + number * factor);
        setSelectedCell(null);
        setActiveNumber(null);
        setHighlightedCells(new Set());
      } else {
        setErrorCell({ row: selectedCell.row, col: selectedCell.col });
        setTimeout(() => setErrorCell(null), 1000);
        setErrors(errors! + 1);
        setScore(Math.max(0, score - ERROR_PENALTY_MULTIPLAYER * factor));
        playSound();
        onClickHapticHeavy();
        setSelectedCell(null);
        setHighlightedCells(new Set());
        setActiveNumber(null);
        setNotification({
          message: "Invalid number",
          type: "warning",
        });
      }
    }
  };

  const handleGoBackAndSaveCurrent = async () => {
    await saveCurrentGame();
    setHasSavedGame(true);
    setSavedGameLevel(level);
    resetBoard();
    router.back();
  };

  const handleClueCount = () => {
    if (remainingClues === 0) {
      setNoCluesModal(true);
      return;
    }
    if (selectedCell !== null) {
      setRemainingClues((prev) => prev - 1);
      setScore(Math.max(0, score - CLUE_COST_MULTIPLAYER * factor));
      setClueCell(solutionBoard[selectedCell!.row][selectedCell!.col].value);
      if (cluetimeoutRef.current) clearTimeout(cluetimeoutRef.current);

      cluetimeoutRef.current = setTimeout(() => {
        setClueCell(null);
        cluetimeoutRef.current = null;
      }, 5000);
    } else {
      setNotification({
        message: "Select a cell first",
        type: "warning",
      });
    }
  };

  return {
    board,
    selectedCell,
    highlightedCells,
    rotatedCells,
    rotate,
    setRotate,
    clueCell,
    activeNumber,
    errorCell,
    remainingClues,
    noCluesModal,
    setNoCluesModal,
    gameCompleteModal,
    setGameCompleteModal,
    finalScore,
    streakBrokeModal,
    setStreakBrokeModal,
    handleCellPress,
    handleClickNumberPad,
    handleGoBackAndSaveCurrent,
    handleClueCount,
    completedNumbers,
    levelString,
    score,
    errors,
    factor,
    timer,
    formatTimer,
    notification,
    resetBoard,
    isNewScoreRecord,
    isNewTimeRecord,
  };
};

export default useGameBoard;
