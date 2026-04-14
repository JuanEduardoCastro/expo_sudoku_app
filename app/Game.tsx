import GameBoard from "@/components/grid/GameBoard";
import { TColors } from "@/constants/types";
import useLevel from "@/hooks/useLevel";
import useStyles from "@/hooks/useStyles";
import { savedGamesService } from "@/store/dbServices";
import { useBoardStore } from "@/store/store_zustand";
import { generatesBoard } from "@/utils/gameLogic";
import { useLocalSearchParams } from "expo-router";
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

  const levelId = Number(level);
  const { difficulty } = useLevel(levelId);
  const [boardToUse, setBoardToUse] = useState<Board | null>(null);
  const [solutionToUse, setSolutionToUse] = useState<Board | null>(null);
  const [initialCLues, setInitialCLues] = useState<number | null>(null);

  const { board, solution } = useMemo(() => {
    if (resume) {
      return { board: [], solution: [] };
    } else {
      return generatesBoard(difficulty);
    }
  }, [difficulty, resume]);

  const { setBoardState, setLevel, setScore, setErrors } = useBoardStore();

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
      setLevel(levelId);
      setIsReady(true);
    }
  }, []);

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
