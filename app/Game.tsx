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

  const { setBoardState, setLevel, resetBoard } = useBoardStore();
  const { onClickHapticHeavy } = useHaptic();

  const [confirmExitGame, setConfirmExitGame] = useState<boolean>(false);

  useEffect(() => {
    setBoardState({ boardStored: board, solutionBoardStored: solution });
    setLevel(Number(level));
    return () => resetBoard();
  }, []);

  const handleBackButton = () => {
    setConfirmExitGame(true);
    onClickHapticHeavy();
  };

  const handleOpenModal = () => {
    onClickHapticHeavy();
    setConfirmExitGame(!confirmExitGame);
  };

  const goBackCommand = () => {
    onClickHapticHeavy();
    setConfirmExitGame(false);
    resetBoard();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <GameBoard
          generatedBoard={board}
          solution={solution}
          level={Number(level)}
          backButton={handleBackButton}
        />
      </View>

      {confirmExitGame && (
        <ConfirmationModal
          title={"Leave the game?"}
          icon="🚪"
          visible={confirmExitGame}
          content="Your current progress will be lost."
          content2="Are you sure you want exit?"
          acceptText="Yes"
          acceptOnPress={goBackCommand}
          cancelText="No"
          cancelOnPress={handleOpenModal}
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
    gridContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
