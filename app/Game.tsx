import GameBoard from "@/components/grid/GameBoard";
import ButtonBack from "@/components/shared/ButtonBack";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { useBoardStore } from "@/store/store";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Represents the properties of a single cell in the Sudoku grid.
 */
export type CellProps = {
  /** The row index of the cell (0-8). */
  row: number;
  /** The column index of the cell (0-8). */
  col: number;
  /** The number value of the cell (1-9), or `null` if empty. */
  value: number | null;
  /** A boolean indicating if the cell's value can be changed by the user. */
  editable: boolean;
};

/**
 * Represents the entire 9x9 Sudoku board as a 2D array of `CellProps`.
 */
export type Board = CellProps[][];

/**
 * The main screen component for the Sudoku game.
 * It receives the difficulty `level` via navigation parameters, generates a new board,
 * and initializes the global game state using a Zustand store. It also manages the
 * exit confirmation flow with a modal.
 */
const Game = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  /** Retrieves the difficulty level passed from the previous screen (e.g., Home). */
  const { level } = useLocalSearchParams();

  /** Generates a new Sudoku board and its solution based on the difficulty level. */
  const { board, solution } = generatesBoard(Number(level));

  /** Hooks into the global board state store (Zustand) for state management. */
  const { setBoardState, setLevel, score, resetBoard, factor } = useBoardStore();
  const { onClickHapticHeavy } = useHaptic();

  /** State to control the visibility of the exit confirmation modal. */
  const [openModal, setOpenModal] = useState<boolean>(false);

  /**
   * Effect that runs once on component mount to initialize the global game state
   * with the newly generated board, solution, and difficulty level.
   * The cleanup function ensures the board state is reset when the component unmounts.
   */
  useEffect(() => {
    setBoardState({ boardStored: board, solutionBoardStored: solution });
    setLevel(Number(level));
    return () => resetBoard();
  }, []);

  /**
   * Handles the press of the back button in the header, opening the confirmation modal.
   */
  const handleBackButton = () => {
    setOpenModal(true);
    onClickHapticHeavy();
  };

  /**
   * Toggles the visibility of the confirmation modal.
   */
  const handleOpenModal = () => {
    onClickHapticHeavy();
    setOpenModal(!openModal);
  };

  /**
   * Confirms the exit action. It closes the modal, resets the global game state
   * via `resetBoard()`, and navigates back to the previous screen.
   */
  const goBackCommand = () => {
    onClickHapticHeavy();
    setOpenModal(false);
    resetBoard();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={handleBackButton} />
        <Text style={styles.scoreText}>X: {factor}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.gridContainer}>
        <GameBoard generatedBoard={board} solution={solution} level={Number(level)} />
      </View>
      {/**
       * Renders a confirmation modal when the user attempts to exit the game.
       */}
      {openModal && (
        <ConfirmationModal
          visible={openModal}
          handleOpenModal={handleOpenModal}
          content="Are you sure you want to exit?"
          cancelOnPress={handleOpenModal}
          acceptOnPress={goBackCommand}
          cancelText="No"
          acceptText="Yes"
        />
      )}
    </SafeAreaView>
  );
};

export default Game;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    header: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    gridContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    scoreText: {
      fontSize: 18,
      color: colors.text,
    },
  });
