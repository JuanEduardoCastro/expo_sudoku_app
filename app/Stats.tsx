import AppText from "@/components/shared/AppText";
import ButtonBack from "@/components/shared/ButtonBack";
import GlobalScores from "@/components/stats/GlobalScores";
import ScoresByLevel from "@/components/stats/ScoresByLevel";
import { H_PAD, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store_zustand";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stats = () => {
  const { styles } = useStyles(createStyles);
  const { globalScores } = useGameScoresStore();
  const hasGames = globalScores.totalGames > 0;

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <AppText style={styles.pageTitle}>Statistics</AppText>
      </View>

      <View style={{ height: verticalScale(22) }} />

      {hasGames ? (
        <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
          <GlobalScores />
          <View style={{ height: verticalScale(22) }} />
          <ScoresByLevel />
          <View style={styles.statsContainer}></View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <AppText style={styles.emptyIcon}>🎯</AppText>
          <AppText style={styles.emptyTitle}>No games yet</AppText>
          <AppText style={styles.emptySubtitle}>
            Complete your first game to see your stats here.
          </AppText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Stats;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "flex-start",
      padding: H_PAD,
      paddingTop: Platform.OS === "android" ? 44 : null,
    },
    header: {
      width: "100%",
      height: verticalScale(46),
      flexDirection: "row",
      alignItems: "center",
      gap: scale(18),
    },
    pageTitle: {
      ...textVar.titleBold,
      color: colors.text,
    },
    statsContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(16),
      gap: scale(28),
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: verticalScale(10),
      paddingBottom: verticalScale(60),
    },
    emptyIcon: {
      fontSize: scale(48),
    },
    emptyTitle: {
      ...textVar.xxlargeBold,
      color: colors.text,
    },
    emptySubtitle: {
      ...textVar.base,
      color: colors.textMuted,
      textAlign: "center",
      paddingHorizontal: scale(32),
    },
  });
