import GameBoard from "@/components/grid/GameBoard";
import { TColors } from "@/constants/types";
import useHaptic from "@/hooks/useHaptic";
import useLevel from "@/hooks/useLevel";
import useStyles from "@/hooks/useStyles";
import { savedGamesService } from "@/store/dbServices";
import { useBoardStore } from "@/store/store_zustand";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  const { level, resume } = useLocalSearchParams();
  const router = useRouter();

  const levelId = Number(level);
  const { difficulty } = useLevel(levelId);
  const [boardToUse, setBoardToUse] = useState<Board | null>(null);
  const [solutionToUse, setSolutionToUse] = useState<Board | null>(null);
  const [initialCLues, setInitialCLues] = useState<number | null>(null);

  // const { board, solution } = useMemo(() => generatesBoard(difficulty), [difficulty]);

  const { board, solution } = useMemo(() => {
    if (resume) {
      return { board: [], solution: [] };
    } else {
      return generatesBoard(difficulty);
    }
  }, [difficulty, resume]);

  const { setBoardState, setLevel, resetBoard, setScore, setErrors } = useBoardStore();
  const { onClickHapticHeavy } = useHaptic();

  // const [confirmExitGame, setConfirmExitGame] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [resolvedLevel, setResolvedLevel] = useState(0);
  const [initialTimer, setInitialTimer] = useState(0);

  useEffect(() => {
    if (resume) {
      savedGamesService.load().then((game) => {
        if (game) {
          let parsedBoardToUse = JSON.parse(game.boardState);
          let parsedSolutionToUse = JSON.parse(game.solutionState);
          setBoardToUse(parsedBoardToUse);
          setSolutionToUse(parsedSolutionToUse);
          setResolvedLevel(game.level);
          setScore(game.currentScore);
          setErrors(game.currentError);
          setInitialTimer(game.elapsedTime);
          setBoardState({
            boardStored: parsedBoardToUse,
            solutionBoardStored: parsedSolutionToUse,
          });
          setLevel(game.level);
          setIsReady(true);
          setInitialCLues(game.remainingClues);
        }
      });
    }
    if (!resume) {
      // generatesBoard(difficulty);
      // setBoardState({ boardStored: board, solutionBoardStored: solution });
      setLevel(levelId);
      setIsReady(true);
    }
  }, []);

  // useEffect(() => {
  //   if (!isResume) return;
  //   savedGamesService.load().then((saved) => {
  //     if (!saved) return;
  //     const loadedBoard = JSON.parse(saved.boardState);
  //     const loadedSolution = JSON.parse(saved.solutionState);
  //     setBoardState({ boardStored: loadedBoard, solutionBoardStored: loadedSolution });
  //     setScore(saved.currentScore);
  //     setErrors(saved.currentError);
  //   });
  // }, [isResume]);

  // useEffect(() => {
  //   setBoardState({ boardStored: board, solutionBoardStored: solution });
  //   setLevel(Number(level));
  //   return () => resetBoard();
  // }, []);

  // const handleBackButton = () => {
  //   setConfirmExitGame(true);
  //   onClickHapticHeavy();
  // };

  // const handleOpenModal = () => {
  //   onClickHapticHeavy();
  //   setConfirmExitGame(!confirmExitGame);
  // };

  const goBackCommand = () => {
    onClickHapticHeavy();
    // setConfirmExitGame(false);
    resetBoard();
    router.back();
  };

  if (!isReady)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <GameBoard
          generatedBoard={boardToUse ?? board}
          solution={solutionToUse ?? solution}
          level={resolvedLevel || levelId}
          initialTimer={initialTimer}
          initialClues={initialCLues ?? undefined}
        />
      </View>

      {/* {confirmExitGame && (
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
      )} */}
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
