import ButtonBack from "@/components/shared/ButtonBack";
import { H_PAD } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Instructions = () => {
  const { colors, styles } = useStyles(createStyles);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <Text style={styles.pageTitle}>How to Play Sudoku</Text>
      </View>

      <View style={{ height: 42 }} />

      {/* <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View> */}
      <View style={styles.content}>
        {/* <Text style={styles.title}>How to Play Sudoku</Text> */}
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
      justifyContent: "flex-start",
      padding: H_PAD,
    },
    header: {
      width: "100%",
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      gap: 24,
    },
    pageTitle: {
      fontSize: 30,
      fontWeight: "700",
      color: colors.text,
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
      lineHeight: 26,
      color: colors.text,
    },
  });
