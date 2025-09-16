import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatsCard from "./StatsCard";

/**
 * `ScoresByLevel` is a component that displays the player's statistics broken down by each difficulty level.
 * It fetches data from the `useGameScoresStore` and dynamically renders a section for each level.
 */
const ScoresByLevel = () => {
  const { colors, styles } = useStyles(createStyles);

  const { scoresByLevels } = useGameScoresStore();

  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Scores by level</Text>
      {scoresByLevels.map((levelStats) => (
        <React.Fragment key={levelStats.level}>
          <View style={{ height: 8 }} />
          <StatsCard title="Level" value={levelStats.name} />
          <StatsCard title="Max points" value={levelStats.maxPoints} />
          <StatsCard title="Total games" value={levelStats.totalGames} />
          {/* TODO: Format time value appropriately */}
          <StatsCard title="Best time" value={levelStats.besttime} />
          <StatsCard title="Streak" value={levelStats.streak} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default ScoresByLevel;

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
