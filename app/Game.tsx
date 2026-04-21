import GameBoard from "@/components/grid/GameBoard";
import Loading from "@/components/shared/Loading";
import { TColors } from "@/constants/types";
import useLevel from "@/hooks/useLevel";
import useStyles from "@/hooks/useStyles";
import { savedGamesService } from "@/store/dbServices";
import { useBoardStore } from "@/store/store_zustand";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type CellProps = {
  row: number;
  col: number;
  value: number | null;
  editable: boolean;
};

export type Board = CellProps[][];

const Game = () => {
  const { styles } = useStyles(createStyles);
  const { level, resume } = useLocalSearchParams();

  const levelId = Number(level);
  const { difficulty } = useLevel(levelId);

  const { setLevel, setScore, setErrors } = useBoardStore();

  const [boardToUse, setBoardToUse] = useState<Board | null>(null);
  const [solutionToUse, setSolutionToUse] = useState<Board | null>(null);
  const [initialClues, setInitialClues] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [resolvedLevel, setResolvedLevel] = useState(0);
  const [initialTimer, setInitialTimer] = useState(0);
  const [board, setBoard] = useState<Board>([]);
  const [solution, setSolution] = useState<Board>([]);

  useEffect(() => {
    if (!resume) {
      setLevel(levelId);
      setTimeout(() => {
        const { board: newBoard, solution: newSolution } = generatesBoard(difficulty);
        setBoard(newBoard);
        setSolution(newSolution);
        setIsReady(true);
      }, 0);
    }
  }, [difficulty, resume]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const loadGame = async () => {
      try {
        const game = await savedGamesService.load();
        if (game) {
          setBoardToUse(JSON.parse(game.boardState));
          setSolutionToUse(JSON.parse(game.solutionState));
          setResolvedLevel(game.level);
          setScore(game.currentScore);
          setErrors(game.currentError);
          setInitialTimer(game.elapsedTime);
          setLevel(game.level);
          setIsReady(true);
          setInitialClues(game.remainingClues);
        } else {
          const { board: newBoard, solution: newSolution } = generatesBoard(difficulty);
          setBoard(newBoard);
          setSolution(newSolution);
          setLevel(levelId);
        }
      } catch (error) {
        __DEV__ && console.error("Failed to load saved game:", error);
        setLevel(levelId);
      } finally {
        setIsReady(true);
      }
    };
    if (resume) loadGame();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isReady) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        <GameBoard
          generatedBoard={boardToUse ?? board}
          solution={solutionToUse ?? solution}
          level={resolvedLevel > 0 ? resolvedLevel : levelId}
          initialTimer={initialTimer}
          initialClues={initialClues ?? undefined}
        />
      </View>
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
      paddingTop: Platform.OS === "android" ? 34 : null,

      gap: 10,
    },
    gridContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
