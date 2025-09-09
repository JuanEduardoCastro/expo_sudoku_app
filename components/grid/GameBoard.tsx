import { Board, CellProps } from "@/app/Game";
import useTimer from "@/hooks/useTimer";
import { checkCol, checkGame, checkGrid, checkRow, isValid } from "@/utils/gameLogic";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
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
  const [board, setBoard] = useState<Board>(generatedBoard);
  const [levelString, setLevelString] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellProps | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [rotate, setRotate] = useState<boolean>(false);
  const [clueCount, setClueCount] = useState<number | null>(null);
  const [clueCell, setClueCell] = useState<number | null>(null);
  const [solutionBoard, setSolutionBoard] = useState<Board>(solution);

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

  useEffect(() => {
    console.log("CHECK BOARD !!!!!!");
    if (selectedCell !== null) {
      if (checkRow(board, selectedCell!.row)) {
        console.log("completo fila");
        console.log("hightlightedCells", highlightedCells);
      }
      if (checkCol(board, selectedCell!.col)) {
        console.log("completo columna");
      }
      if (checkGrid(board, selectedCell!.row, selectedCell!.col)) {
        console.log("completo grid");
        setRotate(true);
      }
    }
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
    if (!cell.editable === true) return;

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
      Alert.alert("Select a cell first");
      return;
    } else {
      const checkNumberInCell = isValid(board, selectedCell!.row, selectedCell!.col, number);

      if (checkNumberInCell) {
        board[selectedCell!.row][selectedCell!.col].value = number;
        board[selectedCell!.row][selectedCell!.col].editable = false;
        setBoard([...board]);
        setClueCell(null);
      } else {
        Alert.alert("Invalid number");
      }
    }
  };

  const handleClueCount = () => {
    if (clueCount === 0) {
      Alert.alert("No more clues");
      return;
    } else {
      if (selectedCell !== null) {
        setClueCount(clueCount! - 1);
        setClueCell(solutionBoard[selectedCell!.row][selectedCell!.col].value);
      } else {
        Alert.alert("Select a cell first");
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
                selected={selectedCell?.row === cell.row && selectedCell?.col === cell.col}
                rotate={rotate}
                setRotate={setRotate}
              />
            ))
          )}
        </View>
        <View style={{ height: 40 }} />
        <View>
          <NumberPad onPress={handleClickNumberPad} clueCell={clueCell} />
        </View>
      </View>
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
