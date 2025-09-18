import {
  ColorModeIcon,
  SoundDisabledIcon,
  SoundEnabledIcon,
  VibDisabledIcon,
  VibEnabledIcon,
} from "@/assets/svgs";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import useHaptic from "@/hooks/useHaptic";
import useStyles from "@/hooks/useStyles";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SettingsCard from "./SettingsCard";

/**
 * `SettingsBlock` is a component that groups and displays various application settings.
 * It provides interactive options for users to customize their experience.
 *
 * This component manages and renders individual settings for:
 * - **Color Mode**: Toggles between light and dark themes using `useColorMode` context.
 * - **Vibration**: Enables or disables haptic feedback using the `useHaptic` hook.
 * - **Sound**: Toggles in-game sound effects (currently managed via local state).
 *
 * Each setting is presented using a `SettingsCard` component, which displays the
 * setting's title, its current state, and an icon.
 */
const SettingsBlock = () => {
  const { colors, styles } = useStyles(createStyles);
  const { vibEnabled, setVibEnabled } = useHaptic();
  const { colorMode, toggleColorMode } = useColorMode();

  const [soundEnabled, setSoundEnabled] = useState(true);

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
      <View style={{ height: 8 }} />
      <SettingsCard
        onPress={handleToggleColorMode}
        title={`${colorMode === "light" ? "Dark" : "Light"} mode`}
        icon={<ColorModeIcon width={24} height={24} color={colors.tint} />}
      />
      <SettingsCard
        onPress={handleToggleVib}
        title={`Vibration tick ${vibEnabled ? "disabled" : "enabled"}`}
        icon={
          vibEnabled ? (
            <VibEnabledIcon width={24} height={24} color={colors.tint} />
          ) : (
            <VibDisabledIcon width={24} height={24} color={colors.tint} />
          )
        }
      />
      <SettingsCard
        onPress={handleToggleSound}
        title={`Sound ${soundEnabled ? "disabled" : "enabled"}`}
        icon={
          soundEnabled ? (
            <SoundEnabledIcon width={24} height={24} color={colors.tint} />
          ) : (
            <SoundDisabledIcon width={24} height={24} color={colors.tint} />
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
      gap: 26,
    },
  });
