import ButtonBack from "@/components/shared/ButtonBack";
import { scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Instructions = () => {
  const { styles } = useStyles(createStyles);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <Text style={styles.pageTitle}>How to Play Sudoku</Text>
      </View>

      <View style={{ height: verticalScale(42) }} />

      <View style={styles.content}>
        <Text style={styles.ruleText}>
          {`• The goal is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids that compose the grid contain all of the digits from 1 to 9.`}
        </Text>
        <Text style={styles.ruleText}>
          {`• On Easy and Medium levels, selecting an empty cell highlights its row, column and 3x3 grid.`}
        </Text>
        <Text style={styles.ruleText}>
          {`• Tap a number from the number pad at the bottom to place it in the selected cell.`}
        </Text>
        <Text
          style={styles.ruleText}
        >{`• If you get stuck, use the "Clue" button for a hint!`}</Text>
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
      paddingTop: Platform.OS === "android" ? 34 : null,
      // padding: H_PAD,
    },
    header: {
      width: "100%",
      height: verticalScale(36),
      flexDirection: "row",
      alignItems: "center",
      gap: scale(24),
    },
    pageTitle: {
      ...textVar.titleBold,
      color: colors.text,
    },

    content: {
      flex: 1,
      paddingHorizontal: scale(30),
      gap: scale(20),
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
      textAlign: "center",
    },
    ruleText: {
      ...textVar.largeLight,
      lineHeight: 26,
      letterSpacing: 1.2,
      color: colors.text,
      // textAlign: "justify",
    },
  });
