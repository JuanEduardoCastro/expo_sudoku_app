import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LevelStatsPropps = {
  levelStats: {
    besttime?: number;
    level?: number;
    maxPoints?: number;
    name?: string;
    streak?: number;
    totalGames?: number;
  };
  levelColor: string;
};

const LevelStatCard = ({ levelStats, levelColor }: LevelStatsPropps) => {
  const { colors, styles } = useStyles(createStyles);

  const [toggleCard, setToggleCard] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  });

  return (
    <Pressable style={[styles.levelStatCard]} onPress={() => setToggleCard(!toggleCard)}>
      <View style={[styles.levelStatBar, { backgroundColor: levelColor }]} />
      <View style={styles.levelStatBody}>
        <View style={styles.resumeStatBody}>
          <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
            <Text style={styles.levelStatName}>{levelStats.name}</Text>
            <View style={styles.levelStatData}>
              {!toggleCard && (
                <Text style={styles.levelStatMeta}>
                  Best {formatter.format(levelStats.maxPoints!)}
                </Text>
              )}
              {/* <Text style={styles.levelStatMeta}>-</Text>
          <Text style={styles.levelStatMeta}>{levelStats.totalGames} games</Text> */}
            </View>
          </View>
          <View style={styles.expandArrowBlock}>
            <Text
              style={[
                styles.expandArrow,
                { transform: [{ rotate: toggleCard ? "-90deg" : "90deg" }] },
              ]}
            >
              ‹
            </Text>
          </View>
        </View>
        {toggleCard && (
          <View style={styles.expandContainer}>
            <View style={styles.expandBody}>
              <View style={styles.expandGrid}>
                <View style={styles.expandTile}>
                  <Text style={styles.expandTileValue}>{levelStats.besttime}</Text>
                  <Text style={styles.expandTileLabel}>Best time</Text>
                </View>
                <View style={styles.expandTile}>
                  <Text style={styles.expandTileValue}>
                    {formatter.format(levelStats.maxPoints!)}
                  </Text>
                  <Text style={styles.expandTileLabel}>Max points</Text>
                </View>
                <View style={styles.expandTile}>
                  <Text style={styles.expandTileValue}>{levelStats.totalGames}</Text>
                  <Text style={styles.expandTileLabel}>Games</Text>
                </View>
                <View style={styles.expandTile}>
                  <Text style={styles.expandTileValue}>{levelStats.streak}</Text>
                  <Text style={styles.expandTileLabel}>Streak</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default LevelStatCard;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    levelStatCard: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      marginBottom: 10,
      overflow: "hidden",
    },
    levelStatBar: {
      width: 5,
      alignSelf: "stretch",
    },
    levelStatBody: {
      flex: 1,
      padding: 12,
      alignItems: "flex-start",
      gap: 6,
    },
    resumeStatBody: {
      flexDirection: "row",
      width: "100%",
      height: 36,
      alignItems: "center",
      justifyContent: "space-between",
    },
    levelStatName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    levelStatData: {
      flexDirection: "row",
      height: 16,
      gap: 12,
    },
    levelStatMeta: {
      fontSize: 14,
      color: colors.textMuted,
    },
    expandArrowBlock: {
      paddingRight: 14,
      paddingLeft: 8,
    },

    expandArrow: {
      textAlignVertical: "center",
      fontSize: 16,
      color: colors.textMuted,
    },

    expandContainer: {
      width: "100%",
    },
    expandBody: {
      // width: "100%",
      // paddingHorizontal: 14,
      paddingVertical: 8,
      gap: 14,
    },
    expandGrid: {
      flexDirection: "row",
      gap: 8,
    },
    expandTile: {
      backgroundColor: colors.surface2,
      flex: 1,
      alignItems: "center",
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 4,
    },
    expandTileValue: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.text,
    },
    expandTileLabel: {
      fontSize: 10,
      fontWeight: "600",
      letterSpacing: 0.5,
      color: colors.textMuted,
    },
  });
