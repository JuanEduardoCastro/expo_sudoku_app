import ButtonBack from "@/components/shared/ButtonBack";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

/**
 * The `Instructions` screen provides players with the rules of Sudoku
 * and instructions on how to interact with the game controls.
 */
const Instructions = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>How to Play Sudoku</Text>
        <Text style={styles.ruleText}>
          • The goal is to fill a 9x9 grid with digits so that each column, each row, and each of
          the nine 3x3 subgrids that compose the grid contain all of the digits from 1 to 9.
        </Text>
        <Text style={styles.ruleText}>
          • Tap on an empty cell to select it. The row, column, and 3x3 grid will be highlighted.
        </Text>
        <Text style={styles.ruleText}>
          • Tap a number from the number pad at the bottom to place it in the selected cell.
        </Text>
        <Text style={styles.ruleText}>• If you get stuck, use the "Clue" button for a hint!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Instructions;

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
    content: {
      flex: 1,
      paddingHorizontal: 24,
      gap: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
      textAlign: "center",
    },
    ruleText: {
      fontSize: 18,
      color: colors.text,
      lineHeight: 26,
    },
  });
