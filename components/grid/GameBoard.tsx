import { Board, CellProps } from "@/app/Game";
import useLevel from "@/hooks/useLevel";
import useTimer from "@/hooks/useTimer";
import { useBoardStore, useGameScoresStore, useNotificationMessageStore } from "@/store/store";
import { checkCol, checkGame, checkGrid, checkRow, isValid } from "@/utils/gameLogic";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import NotificationModal from "../shared/NotificationModal";
import NumberCell from "./NumberCell";
import NumberPad from "./NumberPad";

type BoardProps = {
  generatedBoard: Board;
  solution: Board;
  level: number;
  setFactorX: (factor: number) => void;
};

const GameBoard = ({ generatedBoard, solution, level, setFactorX }: BoardProps) => {
  const router = useRouter();
  const { notification, setNotification } = useNotificationMessageStore();
  const { score, setScore, errors, setErrors, resetBoard, factor, setFactor } = useBoardStore();
  const { timer, timerRunning, setTimerRunning, formatTimer, timerMultiply } = useTimer();
  const { levelString, clueCount, setClueCount, scoreMultiply } = useLevel(level);
  const { setGameScore, setGlobalScores, setScoresByLevels } = useGameScoresStore();

  const [board, setBoard] = useState<Board>(generatedBoard);
  const [solutionBoard, setSolutionBoard] = useState<Board>(solution);

  const [selectedCell, setSelectedCell] = useState<CellProps | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [rotatedCells, setRotatedCells] = useState<Set<string>>(new Set());
  const [rotate, setRotate] = useState<boolean>(false);

  const [clueCell, setClueCell] = useState<number | null>(null);

  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    timerMultiply !== null ? setFactor(scoreMultiply - timerMultiply!) : setFactor(scoreMultiply);
  }, [timerMultiply, scoreMultiply]);

  useEffect(() => {
    function checkCells() {
      if (selectedCell !== null) {
        const rotateSelection = new Set<string>();
        if (checkRow(board, selectedCell!.row)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${selectedCell!.row},${i}`);
          }
          setScore(score! + 10 * (scoreMultiply - timerMultiply!));
          setRotate(true);
        }
        if (checkCol(board, selectedCell!.col)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${i},${selectedCell!.col}`);
          }
          setScore(score! + 10 * (scoreMultiply - timerMultiply!));
          setRotate(true);
        }
        if (checkGrid(board, selectedCell!.row, selectedCell!.col)) {
          const startRow = Math.floor(selectedCell!.row / 3) * 3;
          const startCol = Math.floor(selectedCell!.col / 3) * 3;
          for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
              rotateSelection.add(`${row},${col}`);
            }
          }
          setScore(score! + 10 * (scoreMultiply - timerMultiply!));
          setRotate(true);
        }
        setRotatedCells(rotateSelection);
      }
    }

    checkCells();

    if (checkGame(board)) {
      setScore(score + Math.floor(timer! * level));
      // setGameScore({
      //   errorCount: errors,
      //   points: score + Math.floor(timer! * level),
      //   level: level,
      //   time: timer!,
      // });
      setIsFinished(true);
      setTimerRunning(false);
      setSelectedCell(null);
      setHighlightedCells(new Set());
      setTimeout(() => {
        router.back();
        resetBoard();
      }, 4800);
    }
  }, [board]);

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
    if (level < 0.65) {
      setHighlightedCells(calculateHighlightedCells(cell));
    }
  };

  const calculateHighlightedCells = (cell: CellProps) => {
    const newHighlightedCells = new Set<string>();
    const { row, col } = cell;

    // Select each row and col for the cell selected
    for (let i = 0; i < 9; i++) {
      newHighlightedCells.add(`${row},${i}`);
      newHighlightedCells.add(`${i},${col}`);
    }

    // select the 3x3 grid for the cell selected
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        newHighlightedCells.add(`${row},${col}`);
      }
    }
    return newHighlightedCells;
  };

  const handleClickNumberPad = (number: number) => {
    if (!selectedCell) {
      setNotification({
        message: "Select a cell first",
        type: "warning",
      });
      return;
    } else {
      const checkNumberInCell = isValid(board, selectedCell!.row, selectedCell!.col, number);

      if (checkNumberInCell) {
        board[selectedCell!.row][selectedCell!.col].value = number;
        board[selectedCell!.row][selectedCell!.col].editable = false;
        setBoard([...board]);
        setClueCell(null);
        setScore(score! + number * (scoreMultiply - timerMultiply!));
        // setSelectedCell(null);
        // setHighlightedCells(new Set());
      } else {
        setErrors(errors! + 1);
        // setErrorCount(errorCount! + 1);
        setScore(score < 3 ? 0 : score! - 5 * (scoreMultiply - timerMultiply!));
        setNotification({
          message: "Invalid number",
          type: "warning",
        });
      }
    }
  };

  const handleClueCount = () => {
    if (clueCount === 0) {
      setNotification({
        message: "No more clues",
        type: "warning",
      });
      return;
    } else {
      if (selectedCell !== null) {
        setScore(score < 3 ? 0 : score! - 3 * (scoreMultiply - timerMultiply!));
        setClueCount(clueCount! - 1);
        setClueCell(solutionBoard[selectedCell!.row][selectedCell!.col].value);
      } else {
        setNotification({
          message: "Select a cell first",
          type: "warning",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 18 }} />
      <View style={styles.finishMsg}>
        {isFinished && (
          <>
            <Text style={styles.finishMsgText}>{`You finish this game in ${formatTimer(
              timer
            )} !`}</Text>
            <Text style={styles.finishMsgText}>{`Your score is ${score} !`}</Text>
          </>
        )}
      </View>

      <View style={{ height: 40 }} />
      <View>
        <View style={styles.headerGrid}>
          {errors > 0 && <Text style={styles.levelText}>Errors: {errors}</Text>}
          {errors > 3 && (
            <Text style={[styles.levelText, { fontWeight: "bold" }]}>Lost streak! </Text>
          )}
        </View>
        <View style={styles.headerGrid}>
          <Text style={styles.levelText}>Level: {levelString}</Text>
          <Text style={styles.levelText}>Time: {formatTimer(timer!)}</Text>
          <Pressable style={styles.clueButton} onPress={handleClueCount}>
            <Text style={styles.levelTextButton}>Clue: {clueCount}</Text>
          </Pressable>
        </View>
        <View style={styles.containerGrid}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <NumberCell
                key={`${rowIndex},${colIndex}`}
                cell={cell}
                onPress={handleCellPress}
                highlighted={highlightedCells.has(`${rowIndex},${colIndex}`)}
                rotatesCells={rotatedCells.has(`${rowIndex},${colIndex}`)}
                selected={selectedCell?.row === cell.row && selectedCell?.col === cell.col}
                rotate={rotate}
                setRotate={setRotate}
                editable={cell.editable}
                setSelectedCell={setSelectedCell}
                setHighlightedCells={setHighlightedCells}
              />
            ))
          )}
        </View>
        <View style={{ height: 40 }} />
        <View>
          <NumberPad onPress={handleClickNumberPad} clueCell={clueCell} />
        </View>
      </View>
      {notification.type && <NotificationModal />}
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  finishMsg: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  finishMsgText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c3a56",
  },
  headerGrid: {
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: {
    width: 1 / 3,
    flexGrow: 1,
    padding: 8,
    fontSize: 15,
    color: "#1c3a56",
  },
  clueButton: {
    flexGrow: 1,
    width: 1 / 3,
    padding: 6,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16,
  },
  levelTextButton: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1c3a56",
  },
  containerGrid: {
    width: 40.5 * 9,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "gray",
  },
});
