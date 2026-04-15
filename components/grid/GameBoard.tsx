import { Board } from "@/app/Game";
import { SCHEMES } from "@/constants/colors";
import { BOARD_WIDTH, H_PAD } from "@/constants/dimensions";
import { getLevels } from "@/constants/levels";
import { SHADOW } from "@/constants/shadows";
import { TColors } from "@/constants/types";
import useGameBoard from "@/hooks/useGameBoard";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ConfirmationModal from "../shared/ConfirmationModal";
import NumberCell from "./NumberCell";
import NumberPad from "./NumberPad";

export type GameBoardProps = {
  generatedBoard: Board;
  solution: Board;
  level: number;
  initialTimer?: number;
  initialClues?: number;
  initialTimerMultiplier?: number;
};

const GameBoard = (props: GameBoardProps) => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  const levels = getLevels(SCHEMES);

  const levelDisplay = levels[props.level - 1] ? levels[props.level - 1].color : colors.lightgray;

  const {
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
  } = useGameBoard(props);
  return (
    <View style={styles.container}>
      <View style={[styles.topBar, SHADOW.standar]}>
        <Pressable onPress={handleGoBackAndSaveCurrent}>
          <Text style={styles.levelBackArrow}>‹</Text>
        </Pressable>
        <View style={[styles.levelPill, { backgroundColor: levelDisplay + "28" }]}>
          <View
            style={[
              styles.levelPillDot,
              {
                backgroundColor: levelDisplay,
              },
            ]}
          />
          <Text style={[styles.levelPillText, { color: levelDisplay }]}>{levelString}</Text>
        </View>
        <Text style={styles.timeLabel}>{formatTimer(timer!)}</Text>
      </View>

      <View style={{ height: 14 }} />

      <View style={[styles.scoreCard, SHADOW.standar]}>
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

      <View style={[styles.boardWrap, SHADOW.standar]}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {row.map((cell, colIndex) => (
              <NumberCell
                key={`${rowIndex},${colIndex}`}
                cell={cell}
                onPress={handleCellPress}
                highlighted={
                  highlightedCells.has(`${rowIndex},${colIndex}`) ||
                  (activeNumber !== null && cell.value === activeNumber)
                }
                rotatesCells={rotatedCells.has(`${rowIndex},${colIndex}`)}
                selected={selectedCell?.row === cell.row && selectedCell?.col === cell.col}
                rotate={rotate}
                setRotate={setRotate}
                editable={cell.editable}
                isError={errorCell?.row === cell.row && errorCell?.col === cell.col}
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

      <NumberPad
        onPress={handleClickNumberPad}
        clueCell={clueCell}
        completedNumbers={completedNumbers}
      />

      {
        <ConfirmationModal
          visible={noCluesModal}
          title={"No clues left!"}
          icon={"💡"}
          content={"You've used all your clues for this game."}
          content2={"Keep going - you've got this!"}
          acceptOnPress={() => setNoCluesModal(false)}
          acceptText={"Got it!"}
          // future: add "watch ad" button here
        />
      }
      {
        <ConfirmationModal
          visible={gameCompleteModal}
          isFinishedModal={true}
          icon={"🎉"}
          title={"Game complete!"}
          acceptOnPress={() => {
            setGameCompleteModal(false);
            router.back();
            resetBoard();
          }}
          acceptText={"Continue"}
          finishedData={{ score, timer, errors }}
        />
      }
      {
        <ConfirmationModal
          visible={streakBrokeModal}
          icon={"⚠️"}
          title={"Oh no!"}
          content={"You lost your streak!"}
          content2={"Keep going - the game is not over!"}
          acceptOnPress={() => setStreakBrokeModal(false)}
          acceptText={"Continue"}
        />
      }
    </View>
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
