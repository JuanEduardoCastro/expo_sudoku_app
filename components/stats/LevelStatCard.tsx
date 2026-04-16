import { moderateScale, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { formatDecimal, formatSeconds } from "@/utils/formatters";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LevelStatsProps = {
  levelStats: {
    bestTime?: number;
    level?: number;
    maxPoints?: number;
    name?: string;
    streak?: number;
    totalGames?: number;
  };
  levelColor: string;
};

const LevelStatCard = ({ levelStats, levelColor }: LevelStatsProps) => {
  const { styles } = useStyles(createStyles);

  const [toggleCard, setToggleCard] = useState(false);

  return (
    <Pressable style={[styles.levelStatCard]} onPress={() => setToggleCard(!toggleCard)}>
      <View style={[styles.levelStatBar, { backgroundColor: levelColor }]} />
      <View style={styles.levelStatBody}>
        <View style={styles.resumeStatBody}>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingVertical: verticalScale(4),
              gap: 6,
              // backgroundColor: "lightblue",
            }}
          >
            <Text style={styles.levelStatName}>{levelStats.name}</Text>
            {!toggleCard && (
              <View style={styles.levelStatData}>
                <>
                  <Text style={styles.levelStatMeta}>
                    Best {formatDecimal.format(levelStats.maxPoints!)}
                  </Text>
                  <Text style={styles.levelStatMeta}>-</Text>
                  <Text style={styles.levelStatMeta}>{levelStats.totalGames} games</Text>
                </>
              </View>
            )}
          </View>
          <View style={styles.expandArrowBlock}>
            <Text
              style={[
                styles.expandArrow,
                { transform: [{ rotate: !toggleCard ? "-90deg" : "90deg" }] },
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
                  <Text style={styles.expandTileValue}>
                    {levelStats.bestTime ? formatSeconds(levelStats.bestTime) : "--"}
                  </Text>
                  <Text style={styles.expandTileLabel}>Best time</Text>
                </View>
                <View style={styles.expandTile}>
                  <Text style={styles.expandTileValue}>
                    {formatDecimal.format(levelStats.maxPoints!)}
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
      borderRadius: moderateScale(16),
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
      padding: scale(12),
      alignItems: "flex-start",
      gap: 6,
    },
    resumeStatBody: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    levelStatName: {
      ...textVar.xlargeBold,
      color: colors.text,
    },
    levelStatData: {
      flexDirection: "row",
      height: verticalScale(16),
      gap: 8,
    },
    levelStatMeta: {
      ...textVar.medium,
      color: colors.textMuted,
    },
    expandArrowBlock: {
      paddingRight: scale(14),
      paddingLeft: scale(8),
    },

    expandArrow: {
      ...textVar.base,
      color: colors.textMuted,
      textAlignVertical: "center",
    },

    expandContainer: {
      width: "100%",
    },
    expandBody: {
      paddingVertical: verticalScale(8),
      gap: scale(14),
    },
    expandGrid: {
      flexDirection: "row",
      gap: 8,
    },
    expandTile: {
      backgroundColor: colors.surface2,
      flex: 1,
      alignItems: "center",
      paddingVertical: verticalScale(12),
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 4,
    },
    expandTileValue: {
      ...textVar.baseBold,
      color: colors.text,
    },
    expandTileLabel: {
      ...textVar.smallLight,
      letterSpacing: 0.5,
      color: colors.textMuted,
    },
  });
