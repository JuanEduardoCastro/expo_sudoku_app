import ButtonBack from "@/components/shared/ButtonBack";
import GlobalScores from "@/components/stats/GlobalScores";
import ScoresByLevel from "@/components/stats/ScoresByLevel";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

/**
 * The `Stats` screen displays the player's game statistics.
 * It includes a header with a back button and a scrollable view
 * containing the `GlobalScores` and `ScoresByLevel` components.
 */
const Stats = () => {
  const { colors, styles } = useStyles(createStyles);

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => router.back()} />
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <GlobalScores />
          <ScoresByLevel />
        </View>
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
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
    },
    header: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    statsContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 28,
    },
  });
