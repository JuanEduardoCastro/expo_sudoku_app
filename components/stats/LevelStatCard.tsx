import { moderateScale, scale, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import { formatDecimal, formatSeconds } from "@/utils/formatters";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../shared/AppText";

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
            <AppText style={styles.levelStatName}>{levelStats.name}</AppText>
            {!toggleCard && (
              <View style={styles.levelStatData}>
                <>
                  <AppText style={styles.levelStatMeta}>
                    Best {formatDecimal.format(levelStats.maxPoints!)}
                  </AppText>
                  <AppText style={styles.levelStatMeta}>-</AppText>
                  <AppText style={styles.levelStatMeta}>{levelStats.totalGames} games</AppText>
                </>
              </View>
            )}
          </View>
          <View style={styles.expandArrowBlock}>
            <AppText
              style={[
                styles.expandArrow,
                { transform: [{ rotate: !toggleCard ? "-90deg" : "90deg" }] },
              ]}
            >
              ‹
            </AppText>
          </View>
        </View>
        {toggleCard && (
          <View style={styles.expandContainer}>
            <View style={styles.expandBody}>
              <View style={styles.expandGrid}>
                <View style={styles.expandTile}>
                  <AppText style={styles.expandTileValue}>
                    {levelStats.bestTime ? formatSeconds(levelStats.bestTime) : "--"}
                  </AppText>
                  <AppText style={styles.expandTileLabel}>Best time</AppText>
                </View>
                <View style={styles.expandTile}>
                  <AppText style={styles.expandTileValue}>
                    {formatDecimal.format(levelStats.maxPoints!)}
                  </AppText>
                  <AppText style={styles.expandTileLabel}>Max points</AppText>
                </View>
                <View style={styles.expandTile}>
                  <AppText style={styles.expandTileValue}>{levelStats.totalGames}</AppText>
                  <AppText style={styles.expandTileLabel}>Games</AppText>
                </View>
                <View style={styles.expandTile}>
                  <AppText style={styles.expandTileValue}>{levelStats.streak}</AppText>
                  <AppText style={styles.expandTileLabel}>Streak</AppText>
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
