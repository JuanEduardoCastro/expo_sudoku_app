import GameBoard from "@/components/grid/GameBoard";
import ButtonBack from "@/components/shared/ButtonBack";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useBoardStore } from "@/store/store";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

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
 * It initializes the game board based on the selected difficulty,
 * manages navigation, and renders the header and the `GameBoard` component.
 */
const Game = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();
  const { level } = useLocalSearchParams();
  const { board, solution } = generatesBoard(Number(level));
  const { setBoardState, setLevel, score, resetBoard, factor } = useBoardStore();

  /** State to control the visibility of the exit confirmation modal. */
  const [openModal, setOpenModal] = useState<boolean>(false);

  /**
   * Effect hook that runs once when the component mounts.
   * It sets the initial board state and difficulty level in the global store.
   */
  useEffect(() => {
    setBoardState({ boardStored: board, solutionBoardStored: solution });
    setLevel(Number(level));
  }, []);

  /**
   * Handles the press of the back button in the header, opening the confirmation modal.
   */
  const handleBackButton = () => {
    setOpenModal(true);
  };

  /**
   * Toggles the visibility of the confirmation modal.
   */
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  /**
   * Confirms the exit action. It closes the modal, resets the game state,
   * and navigates back to the previous screen.
   */
  const goBackCommand = () => {
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
