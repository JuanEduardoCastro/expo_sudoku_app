import { SCHEMES } from "@/constants/colors";
import { getLevels, TEST_LEVEL } from "@/constants/levels";
import { SHADOW } from "@/constants/shadows";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LevelBoxProps = {
  hasSavedGame?: boolean;
};

const LevelBox = ({ hasSavedGame }: LevelBoxProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { onClickHapticHeavy } = useHaptic();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const levels = getLevels(SCHEMES);

  const handleClick = (level: number) => {
    router.push({ pathname: "/Game", params: { level } });
    onClickHapticHeavy();
  };

  return (
    <View style={styles.levelBox}>
      {Object.values(levels).map((level) => (
        <Pressable
          disabled={!!hasSavedGame}
          key={level.id}
          onPress={() => handleClick(level.id)}
          style={[styles.levelCard, SHADOW.standar, { opacity: hasSavedGame ? 0.6 : 1 }]}
        >
          <View style={[styles.levelDot, { backgroundColor: level.color }]} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={styles.levelText}>{level.name}</Text>
            <Text style={styles.levelTextSub}>{level.sub}</Text>
          </View>
          <View style={styles.levelArrow}>
            <Text
              style={[
                styles.levelArrowIcon,
                { color: colorMode === "dark" ? colors.accentLight : colors.gray },
              ]}
            >
              ›
            </Text>
          </View>
        </Pressable>
      ))}
      {__DEV__ && (
        <Pressable onPress={() => handleClick(TEST_LEVEL.id)} style={styles.levelCard}>
          <Text style={styles.levelText}>For test</Text>
        </Pressable>
      )}
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
      gap: 14,
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
