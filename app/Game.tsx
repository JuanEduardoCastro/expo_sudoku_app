import GameBoard from "@/components/grid/GameBoard";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useLevel from "@/hooks/useLevel";
import useStyles from "@/hooks/useStyles";
import { useBoardStore } from "@/store/store_zustand";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type CellProps = {
  row: number;
  col: number;
  value: number | null;
  editable: boolean;
};

export type Board = CellProps[][];

const Game = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  const { level } = useLocalSearchParams();
  const levelId = Number(level);
  const { difficulty } = useLevel(levelId);

  const { board, solution } = useMemo(() => generatesBoard(difficulty), [difficulty]);

  const { setBoardState, setLevel, score, resetBoard, factor } = useBoardStore();
  const { onClickHapticHeavy } = useHaptic();

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setBoardState({ boardStored: board, solutionBoardStored: solution });
    setLevel(Number(level));
    return () => resetBoard();
  }, []);

  const handleBackButton = () => {
    setOpenModal(true);
    onClickHapticHeavy();
  };

  const handleOpenModal = () => {
    onClickHapticHeavy();
    setOpenModal(!openModal);
  };

  const goBackCommand = () => {
    onClickHapticHeavy();
    setOpenModal(false);
    resetBoard();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <ButtonBack onPress={handleBackButton} />
        <Text style={styles.factorText}>X: {factor}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View> */}
      <View style={styles.gridContainer}>
        <GameBoard
          generatedBoard={board}
          solution={solution}
          level={Number(level)}
          backButton={handleBackButton}
        />
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
    factorText: {
      fontSize: 18,
      color: colors.text,
    },
    scoreText: {
      alignItems: "flex-end",
      width: 90,
      fontSize: 18,
      color: colors.text,
    },
  });
