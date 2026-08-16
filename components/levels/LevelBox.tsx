import { SCHEMES } from "@/constants/colors";
import { scale } from "@/constants/dimensions";
import { getLevels, isLevelLocked, LEVEL_UNLOCK_GAMES } from "@/constants/levels";
import { SHADOW } from "@/constants/shadows";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { useGameScoresStore } from "@/store/store_zustand";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../shared/AppText";

type LevelBoxProps = {
  hasSavedGame?: boolean;
  savedGameLevel?: number | null;
  onDisabledPress?: (levelId: number) => void;
  onLockedPress?: (levelId: number) => void;
};

const LevelBox = ({
  hasSavedGame,
  savedGameLevel,
  onDisabledPress,
  onLockedPress,
}: LevelBoxProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { scoresByLevels } = useGameScoresStore();
  const levels = getLevels(SCHEMES);

  const handleClick = (level: number) => {
    if (isLevelLocked(level, scoresByLevels)) {
      onClickHapticHeavy();
      onLockedPress?.(level);
      return;
    }
    if (hasSavedGame) {
      onClickHapticHeavy();
      onDisabledPress?.(level);
      return;
    } else {
      router.push({ pathname: "/Game", params: { level } });
      onClickHapticHeavy();
    }
  };

  return (
    <View style={styles.levelBox}>
      {Object.values(levels).map((level) => {
        const locked = isLevelLocked(level.id, scoresByLevels);

        return (
          <Pressable
            accessibilityLabel={`${level.name} difficulty${locked ? ", locked" : ""}`}
            accessibilityHint={
              locked
                ? `Complete ${LEVEL_UNLOCK_GAMES} games in the previous level to unlock`
                : hasSavedGame
                  ? "A game is already saved"
                  : "Start a new game"
            }
            accessibilityRole="button"
            key={level.id}
            onPress={() => handleClick(level.id)}
            style={[
              styles.levelCard,
              SHADOW.standar,
              { opacity: locked ? 0.5 : hasSavedGame ? 0.7 : 1 },
            ]}
          >
            <View style={[styles.levelDot, { backgroundColor: level.color }]} />
            <View style={{ flex: 1, gap: 2 }}>
              <AppText style={styles.levelText}>{level.name}</AppText>
              <AppText style={styles.levelTextSub}>
                {locked ? `🔒 Complete ${LEVEL_UNLOCK_GAMES} games to unlock` : level.sub}
              </AppText>
            </View>
            <View style={styles.levelArrow}>
              <AppText
                style={[
                  styles.levelArrowIcon,
                  { color: colorMode === "dark" ? colors.accentLight : colors.gray },
                ]}
              >
                {locked ? "🔒" : "›"}
              </AppText>
            </View>
          </Pressable>
        );
      })}
      {hasSavedGame && (
        <Pressable
          accessibilityLabel={`Resume ${savedGameLevel ? levels[savedGameLevel - 1]?.name : ""} game`}
          accessibilityRole="button"
          onPress={() =>
            router.push({ pathname: "/Game", params: { level: savedGameLevel, resume: "true" } })
          }
          style={[styles.levelCard, SHADOW.standar]}
        >
          <View style={[styles.levelDot, { backgroundColor: "transparent" }]} />
          <View style={{ flex: 1, gap: 2 }}>
            <AppText style={styles.levelText}>Continue playing!</AppText>
            <AppText style={styles.levelTextSub}>
              {savedGameLevel ? levels[savedGameLevel - 1]?.name + " level" : ""}
            </AppText>
          </View>
          <View style={styles.levelArrow}>
            <AppText
              style={[
                styles.levelArrowIcon,
                { color: colorMode === "dark" ? colors.accentLight : colors.gray },
              ]}
            >
              ›
            </AppText>
          </View>
        </Pressable>
      )}
      {/* {__DEV__ && (
        <Pressable onPress={() => handleClick(TEST_LEVEL.id)} style={styles.levelCard}>
          <AppText style={styles.levelText}>For test</AppText>
        </Pressable>
      )} */}
    </View>
  );
};

export default LevelBox;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    levelBox: {},
    levelCard: {
      backgroundColor: colors.surface,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 8,
      marginBottom: 10,
      gap: scale(14),
    },
    levelDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    levelText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    levelTextSub: {
      fontSize: 13,
      color: colors.textMuted,
    },
    levelArrow: {
      width: 30,
      height: 30,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    levelArrowIcon: {
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 22,
    },
  });
