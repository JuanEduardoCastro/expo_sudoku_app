import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatsCard from "./StatsCard";

/**
 * `GlobalScores` is a component that displays the player's aggregate statistics across all games played.
 * It fetches data from the `useGameScoresStore` and renders it using `StatsCard` components.
 */
const GlobalScores = () => {
  const { colors, styles } = useStyles(createStyles);

  const { globalScores } = useGameScoresStore();

  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Global scores</Text>
      <View style={{ height: 8 }} />
      {/* TODO: Format time value appropriately */}
      <StatsCard title="Max points" value={globalScores.maxPoints} />
      <StatsCard title="Total games" value={globalScores.totalGames} />
      <StatsCard title="Perfect games" value={globalScores.perfectGames} />
      <StatsCard title="Good games" value={globalScores.goodGames} />
      <StatsCard title="Complete games" value={globalScores.completedGames} />
      <StatsCard title="Total time played" value={globalScores.totalTimePlay} />
    </View>
  );
};

export default GlobalScores;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsSection: {
      width: "100%",
      gap: 4,
    },
    statsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#1c3a56",
    },
  });
