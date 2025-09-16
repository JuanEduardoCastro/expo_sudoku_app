import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * `LevelBox` is a component that displays a list of selectable difficulty levels for the Sudoku game.
 * Each level, when pressed, navigates the user to the `Game` screen with the corresponding
 * difficulty parameter, which determines how many cells are removed from the initial board.
 */
const LevelBox = () => {
  const { colors, styles } = useStyles(createStyles);

  const router = useRouter();
  return (
    <View style={styles.levelBox}>
      {/* A special level for testing purposes with very few cells removed. */}
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.05 } })}>
        <Text style={styles.levelText}>For test</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.54 } })}>
        <Text style={styles.levelText}>Easy</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.6 } })}>
        <Text style={styles.levelText}>Medium</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.65 } })}>
        <Text style={styles.levelText}>Hard</Text>
      </Pressable>
      <Pressable onPress={() => router.push({ pathname: "/Game", params: { level: 0.7 } })}>
        <Text style={styles.levelText}>Expert</Text>
      </Pressable>
    </View>
  );
};

export default LevelBox;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    levelBox: {
      width: "70%",
      paddingHorizontal: 26,
      paddingVertical: 22,
      gap: 16,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 8,
    },
    levelText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#1c3a56",
    },
  });
