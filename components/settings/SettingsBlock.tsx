import {
  ColorModeIcon,
  SoundDisabledIcon,
  SoundEnabledIcon,
  VibDisabledIcon,
  VibEnabledIcon,
} from "@/assets/svgs";
import { verticalScale } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import useHaptic from "@/hooks/useHaptic";
import useLoadSound from "@/hooks/useLoadSound";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { StyleSheet, View } from "react-native";
import SettingsCard from "./SettingsCard";

const SettingsBlock = () => {
  const { colors, styles } = useStyles(createStyles);
  const { vibEnabled, setVibEnabled } = useHaptic();
  const { colorMode, toggleColorMode } = useColorMode();

  const { soundEnabled, setSoundEnabled } = useLoadSound();

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  const handleToggleVib = () => {
    setVibEnabled(!vibEnabled);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <View style={styles.statsSection}>
      <View style={{ height: verticalScale(8) }} />
      <SettingsCard
        onPress={handleToggleColorMode}
        title={`${colorMode === "light" ? "Dark" : "Light"} mode`}
        icon={<ColorModeIcon width={24} height={24} color={colors.accentBase} />}
      />
      <SettingsCard
        onPress={handleToggleVib}
        title={`Vibration tick ${vibEnabled ? "enabled" : "disabled"}`}
        icon={
          vibEnabled ? (
            <VibEnabledIcon width={24} height={24} color={colors.accentBase} />
          ) : (
            <VibDisabledIcon width={24} height={24} color={colors.accentBase} />
          )
        }
      />
      <SettingsCard
        onPress={handleToggleSound}
        title={`Sound ${soundEnabled ? "enabled" : "disabled"}`}
        icon={
          soundEnabled ? (
            <SoundEnabledIcon width={24} height={24} color={colors.accentBase} />
          ) : (
            <SoundDisabledIcon width={24} height={24} color={colors.accentBase} />
          )
        }
      />
    </View>
  );
};

export default SettingsBlock;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsSection: {
      width: "100%",
      gap: scale(16),
    },
  });
