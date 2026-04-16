import ButtonBack from "@/components/shared/ButtonBack";
import GlobalScores from "@/components/stats/GlobalScores";
import ScoresByLevel from "@/components/stats/ScoresByLevel";
import { H_PAD, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stats = () => {
  const { styles } = useStyles(createStyles);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
        <Text style={styles.pageTitle}>Statistics</Text>
      </View>

      <View style={{ height: verticalScale(22) }} />

      <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
        <GlobalScores />
        <View style={{ height: verticalScale(22) }} />
        <ScoresByLevel />
        <View style={styles.statsContainer}></View>
      </ScrollView>
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
    statsContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: scale(16),
      paddingVertical: verticalScale(16),
      gap: scale(28),
    },
  });
