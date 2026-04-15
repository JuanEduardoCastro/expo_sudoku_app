import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store_zustand";
import { formatSeconds } from "@/utils/formatters";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalStatsCard from "./GlobalStatsCard";

const GlobalScores = () => {
  const { colors, styles } = useStyles(createStyles);

  const { globalScores } = useGameScoresStore();

  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>GLOBAL</Text>
      <View style={{ height: 12 }} />
      {/* TODO: Format time value appropriately */}

      <View style={styles.statsGrid}>
        <GlobalStatsCard title="Total games" value={globalScores.totalGames} />
        <GlobalStatsCard title="Max points" value={globalScores.maxPoints} />
        <GlobalStatsCard title="Perfect games" value={globalScores.perfectGames} />
        <GlobalStatsCard
          title="Total time played"
          value={formatSeconds(globalScores.totalTimePlay)}
        />

        {/* --------- ??  */}
        <GlobalStatsCard title="Good games" value={globalScores.goodGames} />
        <GlobalStatsCard title="Complete games" value={globalScores.completedGames} />
      </View>
    </View>
  );
};

export default GlobalScores;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsSection: {
      width: "100%",
      // gap: 4,
    },
    statsTitle: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.textMuted,
      letterSpacing: 1.5,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
  });
