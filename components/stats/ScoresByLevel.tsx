import { SCHEMES } from "@/constants/colors";
import { getLevels } from "@/constants/levels";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store_zustand";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelStatCard from "./LevelStatCard";

const ScoresByLevel = () => {
  const { styles } = useStyles(createStyles);

  const { scoresByLevels } = useGameScoresStore();

  const levels = getLevels(SCHEMES);

  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>BY LEVEL</Text>
      <View style={{ height: 12 }} />

      <View style={styles.statsGrid}>
        {scoresByLevels.map((levelStats) => (
          <LevelStatCard
            key={levelStats.level}
            levelStats={levelStats}
            levelColor={levels[levelStats.level - 1].color}
          />
        ))}
      </View>
    </View>
  );
};

export default ScoresByLevel;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsSection: {
      width: "100%",
    },
    statsTitle: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 1.5,
    },

    statsGrid: {
      gap: 4,
    },
  });
