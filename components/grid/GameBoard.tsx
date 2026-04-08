import { Board, CellProps } from "@/app/Game";
import { BNW, SCHEMES } from "@/constants/colors";
import { BOARD_WIDTH, H_PAD } from "@/constants/dimensions";
import { TEST_LEVEL } from "@/constants/levels";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useLevel from "@/hooks/useLevel";
import useLoadSound from "@/hooks/useLoadSound";
import useStyles from "@/hooks/useStyles";
import useTimer from "@/hooks/useTimer";
import { saveCompletedGame } from "@/store/dbServices";
import {
  useBoardStore,
  useGameScoresStore,
  useNotificationMessageStore,
} from "@/store/store_zustand";
import { checkCol, checkGame, checkGrid, checkRow, isValid } from "@/utils/gameLogic";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import NumberCell from "./NumberCell";
import NumberPad from "./NumberPad";

type GameBoardProps = {
  generatedBoard: Board;
  solution: Board;
  level: number;
  backButton?: () => void;
};

const GameBoard = ({ generatedBoard, solution, level, backButton }: GameBoardProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();
  const { playSound } = useLoadSound();
  const lastPlacedCell = useRef<CellProps | null>(null);

  const router = useRouter();

  const { notification, setNotification, resetNotification } = useNotificationMessageStore();
  const { score, setScore, errors, setErrors, resetBoard, factor, setFactor } = useBoardStore();

  const { timer, timerRunning, setTimerRunning, formatTimer, timerMultiply } = useTimer();
  const { levelString, clueCount, scoreMultiply, difficulty } = useLevel(level);

  const [remainingClues, setRemainingClues] = useState(clueCount);
  const [noCluesModal, setNoCluesModal] = useState(false);

  const [gameCompleteModal, setGameCompleteModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const [board, setBoard] = useState<Board>(generatedBoard);

  const [selectedCell, setSelectedCell] = useState<CellProps | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const [rotatedCells, setRotatedCells] = useState<Set<string>>(new Set());
  const [rotate, setRotate] = useState<boolean>(false);

  const [clueCell, setClueCell] = useState<number | null>(null);

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState("");

  const solutionBoard = solution;

  useEffect(() => {
    if (!notification.message) return;
    const t = setTimeout(() => resetNotification(), 2000);
    return () => clearTimeout(t);
  }, [notification.message]);

  useEffect(() => {
    const raw = scoreMultiply - (timerMultiply ?? 0);
    setFactor(Math.max(1, raw));
  }, [timerMultiply, scoreMultiply]);

  useEffect(() => {
    levelColorSelect(levelString);
  }, []);

  useEffect(() => {
    function checkCells() {
      const cell = lastPlacedCell.current;
      if (cell !== null) {
        const rotateSelection = new Set<string>();
        let bonus = 0;

        if (checkRow(board, cell.row)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${cell!.row},${i}`);
          }
          bonus += 10 * factor;
          setRotate(true);
        }
        if (checkCol(board, cell!.col)) {
          for (let i = 0; i < 9; i++) {
            rotateSelection.add(`${i},${cell!.col}`);
          }
          bonus += 10 * factor;
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
          bonus += 10 * factor;
          setRotate(true);
        }
        if (bonus > 0) {
          setScore(score! + bonus);
        }
        setRotatedCells(rotateSelection);
      }
    }

    checkCells();

    if (checkGame(board)) {
      const computed = score + Math.floor(timer! * level);
      setFinalScore(computed);
      setScore(computed);

      setTimerRunning(false);
      setSelectedCell(null);
      setHighlightedCells(new Set());
      setIsFinished(true);

      const allCells = new Set<string>();
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          allCells.add(`${r},${c}`);
        }
      }
      setRotatedCells(allCells);
      setRotate(true);

      if (level !== TEST_LEVEL.id) {
        saveCompletedGame({
          level: level,
          points: computed,
          timeSeconds: timer!,
          errorCount: errors,
        })
          .then(() => {
            console.log("game saved to database");
            useGameScoresStore.getState().loadFromDatabase();
          })
          .catch((error) => {
            console.error("Error saving game:", error);
          });
        // setTimeout(() => {
        //   router.back();
        //   resetBoard();
        // }, 4800);
      }
      setTimeout(() => setGameCompleteModal(true), 950);
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
    if (level < 3) {
      setHighlightedCells(calculateHighlightedCells(cell));
    }
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
      playSound();
      onClickHapticHeavy();
      return;
    } else {
      const checkNumberInCell = isValid(board, selectedCell!.row, selectedCell!.col, number);

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
        // board[selectedCell!.row][selectedCell!.col].value = number;
        // board[selectedCell!.row][selectedCell!.col].editable = false;
        lastPlacedCell.current = selectedCell;

        setBoard(newBoard);
        setClueCell(null);
        setScore(score! + number * factor);
        setSelectedCell(null);
        setHighlightedCells(new Set());
      } else {
        setErrors(errors! + 1);
        setScore(score < 3 ? 0 : score! - 5 * factor);
        playSound();
        onClickHapticHeavy();
        setNotification({
          message: "Invalid number",
          type: "warning",
        });
      }
    }
  };

  const handleClueCount = () => {
    if (remainingClues === 0) {
      setNoCluesModal(true);
      return;
    }
    if (selectedCell !== null) {
      setRemainingClues((prev) => prev - 1);
      setScore(Math.max(0, score - 3 * factor));
      setClueCell(solutionBoard[selectedCell!.row][selectedCell!.col].value);
    } else {
      setNotification({
        message: "Select a cell first",
        type: "warning",
      });
    }
  };

  const levelColorSelect = (levelColor: string) => {
    switch (levelColor) {
      case "Easy":
        setColorScheme(SCHEMES.easy);
        break;
      case "Medium":
        setColorScheme(SCHEMES.medium);
        break;
      case "Hard":
        setColorScheme(SCHEMES.hard);
        break;
      case "Expert":
        setColorScheme(SCHEMES.expert);
        break;
      default:
        setColorScheme(BNW.lightgray);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={backButton}>
          <Text style={styles.levelBackArrow}>‹</Text>
        </Pressable>
        <View style={[styles.levelPill, { backgroundColor: colorScheme + "28" }]}>
          <View style={[styles.levelPillDot, { backgroundColor: colorScheme }]} />
          <Text style={[styles.levelPillText, { color: colorScheme }]}>{levelString} </Text>
        </View>
        <Text style={styles.timeLabel}>{formatTimer(timer!)}</Text>
      </View>

      <View style={{ height: 14 }} />

      <View style={styles.scoreCard}>
        <View style={styles.scoreBlock}>
          <Text style={styles.scoreCaption}>SCORE</Text>
          <Text style={styles.scoreNum}>{score}</Text>
        </View>
        <View style={styles.factorPill}>
          <Text style={styles.factorX}>x</Text>
          <Text style={styles.factorNum}>{factor}</Text>
        </View>
        <View style={styles.scoreBlock}>
          <Text style={styles.scoreCaption}>ERRORS</Text>
          <View style={styles.dotRow}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.dotError,
                  { backgroundColor: errors > i ? colors.medium : colors.border },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={{ height: 14 }} />

      <View style={styles.boardWrap}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {row.map((cell, colIndex) => (
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
            ))}
          </View>
        ))}
      </View>

      <View style={{ height: 14 }} />

      <View style={styles.bottomRow}>
        <Pressable style={styles.clueRow} onPress={handleClueCount}>
          <Text style={styles.clueCaption}>CLUES</Text>
          <View style={styles.dotRow}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.dotError,
                  { backgroundColor: remainingClues > i ? colors.medium : colors.border },
                ]}
              />
            ))}
          </View>
        </Pressable>
        <View style={styles.notifRow}>
          {notification.message && (
            <Text
              style={[
                styles.notifText,
                { color: notification.type === "warning" ? colors.warning : colors.accept },
              ]}
            >
              {notification.message}{" "}
            </Text>
          )}
        </View>
      </View>

      <View style={{ height: 14 }} />

      <NumberPad onPress={handleClickNumberPad} clueCell={clueCell} />
    </View>

    // <View style={styles.container}>
    //   <View>
    //     <View style={styles.headerGrid}>
    //       {errors > 0 && <Text style={styles.levelText}>Errors: {errors}</Text>}
    //       {errors > 3 && (
    //         <Text style={[styles.levelText, { fontWeight: "bold" }]}>Lost streak! </Text>
    //       )}

    //   {notification.type && <NotificationModal />}

    //   {
    //     <ConfirmationModal
    //       visible={noCluesModal}
    //       handleOpenModal={() => setNoCluesModal(false)}
    //       content={"No more clues available!"}
    //       acceptOnPress={() => setNoCluesModal(false)}
    //       acceptText={"OK"}
    //       cancel={false}
    //       // future: add "watch ad" button here
    //     />
    //   }
    //   {
    //     <ConfirmationModal
    //       visible={gameCompleteModal}
    //       handleOpenModal={() => {}}
    //       content={`Game complete!\nTime: ${formatTimer(timer)}\nScore: ${finalScore}\nLevel: ${levelString}`}
    //       acceptOnPress={() => {
    //         setGameCompleteModal(false);
    //         router.back();
    //         resetBoard();
    //       }}
    //       acceptText={"Continue"}
    //       cancel={false}
    //       // future: add "watch ad" button here
    //     />
    //   }
    // </View>
  );
};

export default GameBoard;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: H_PAD,
    },
    topBar: {
      backgroundColor: colors.surface,
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      gap: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      marginTop: 16,
    },
    levelBackArrow: {
      fontSize: 24,
      // color: "red",
      color: colors.accentBase,
    },
    levelPill: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      paddingHorizontal: 14,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: "center",
    },
    levelPillDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    levelPillText: {
      fontSize: 13,
      fontWeight: "700",
    },
    timeLabel: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 1,
      width: 50,
      textAlign: "right",
    },
    scoreCard: {
      backgroundColor: colors.surface,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 18,
      paddingVertical: 16,
      gap: 10,
    },
    scoreBlock: {
      flexGrow: 1,
      alignItems: "center",
      gap: 4,
    },
    scoreCaption: {
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.2,
      color: colors.textMuted,
    },
    scoreNum: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
    },
    dotRow: {
      flexDirection: "row",
      gap: 5,
      marginTop: 2,
    },
    dotError: {
      width: 9,
      height: 9,
      borderRadius: 5,
    },
    factorPill: {
      backgroundColor: colors.accentLight,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 18,
      gap: 4,
    },
    factorX: {
      fontSize: 22,
      fontWeight: "800",
      lineHeight: 38,
      color: colors.accentBase,
    },
    factorNum: {
      fontSize: 38,
      fontWeight: "900",
      color: colors.accentBase,
    },
    boardWrap: {
      width: BOARD_WIDTH,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: colors.border,
      overflow: "hidden",
      alignSelf: "center",
    },
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    clueRow: {
      height: 25,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingLeft: 2,
    },
    clueCaption: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.5,
    },
    notifRow: {
      width: 220,
      flexDirection: "row-reverse",
    },
    notifText: {
      fontSize: 13,
      fontWeight: "700",
      letterSpacing: 1.5,
    },
  });
