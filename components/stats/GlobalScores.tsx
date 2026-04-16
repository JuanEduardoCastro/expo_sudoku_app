import { verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store_zustand";
import { formatDecimal, formatSeconds } from "@/utils/formatters";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalStatsCard from "./GlobalStatsCard";

const GlobalScores = () => {
  const { styles } = useStyles(createStyles);

  const { globalScores } = useGameScoresStore();

  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>GLOBAL</Text>
      <View style={{ height: verticalScale(12) }} />

      <View style={styles.statsGrid}>
        <GlobalStatsCard title="Total games" value={globalScores.totalGames} />
        <GlobalStatsCard title="Max points" value={formatDecimal.format(globalScores.maxPoints)} />
        <GlobalStatsCard title="Perfect games" value={globalScores.perfectGames} />
        <GlobalStatsCard title="Complete games" value={globalScores.completedGames} />
        <GlobalStatsCard
          title="Total time played"
          value={formatSeconds(globalScores.totalTimePlay)}
        />

        {/* --------- ??  */}
        {/* <GlobalStatsCard title="Good games" value={globalScores.goodGames} /> */}
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
      ...textVar.smallBold,
      color: colors.textMuted,
      letterSpacing: 1.5,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
  });
