import { Board, CellProps } from "@/app/Game";
import useLevel from "@/hooks/useLevel";
import useTimer from "@/hooks/useTimer";
import { useNotificationMessageStore } from "@/store/store";
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
};

const GameBoard = ({ generatedBoard, solution, level }: BoardProps) => {
  const router = useRouter();
  const { timer, timerRunning, setTimerRunning, formatTimer } = useTimer();
  const { levelString, clueCount, setClueCount } = useLevel(level);
  const { notification, setNotification } = useNotificationMessageStore();
  const [board, setBoard] = useState<Board>(generatedBoard);
  const [solutionBoard, setSolutionBoard] = useState<Board>(solution);
  const [selectedCell, setSelectedCell] = useState<CellProps | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [rotatedCells, setRotatedCells] = useState<Set<string>>(new Set());
  const [rotate, setRotate] = useState<boolean>(false);
  const [clueCell, setClueCell] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    function checkCells() {
      console.log("CHECK BOARD !!!!!!");
      if (selectedCell !== null) {
        const rotateSelection = new Set<string>();
        if (checkRow(board, selectedCell!.row)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${selectedCell!.row},${i}`);
          }
          console.log("completo fila");
          console.log("rotateSelection row ->", rotateSelection);
          console.log("hightlightedCells row ->", highlightedCells);
          console.log("selectedCell row ->", selectedCell.row);
          setRotate(true);
        }
        if (checkCol(board, selectedCell!.col)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${i},${selectedCell!.col}`);
          }
          console.log("completo columna");
          console.log("rotateSelection col ->", rotateSelection);
          console.log("hightlightedCells col ->", highlightedCells);
          console.log("selectedCell col ->", selectedCell.col);
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
          console.log("completo grid");
          console.log("rotateSelection grid ->", rotateSelection);
          console.log("hightlightedCells grid ->", highlightedCells);
          console.log("selectedCell grid ->", selectedCell.row, selectedCell.col);

          setRotate(true);
        }
        setRotatedCells(rotateSelection);
        // return rotateSelection;
      }
    }

    checkCells();

    if (checkGame(board)) {
      setIsFinished(true);
      setTimerRunning(false);
      setSelectedCell(null);
      setHighlightedCells(new Set());
      setTimeout(() => {
        router.back();
      }, 2800);
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
    setHighlightedCells(calculateHighlightedCells(cell));
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
      } else {
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
          <Text style={styles.finishMsgText}>{`You finish this game in ${formatTimer(
            timer
          )} !`}</Text>
        )}
      </View>
      <View style={{ height: 40 }} />
      <View>
        <View style={styles.headerGrid}>
          <Text style={styles.levelText}>Level: {levelString}</Text>
          <Text style={styles.levelText}>Time: {formatTimer(timer!)}</Text>

          <Pressable style={styles.clueButton} onPress={handleClueCount}>
            <Text style={styles.levelText}>Clue: {clueCount}</Text>
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
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  levelText: {
    color: "#1c3a56",
  },
  clueButton: {
    padding: 8,
    backgroundColor: "yellow",
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
