import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorModeButton from "./ColorModeButton";
import SettingsCard from "./SettingsCard";

const SettingsBlock = () => {
  const { colors, styles } = useStyles(createStyles);
  return (
    <View style={styles.statsSection}>
      <Text style={styles.statsTitle}>Settings</Text>
      <View style={{ height: 8 }} />
      <SettingsCard title={"Color Mode"} icon={<ColorModeButton />} />
    </View>
  );
};

export default SettingsBlock;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statsSection: {
      width: "100%",
      gap: 4,
    },
    statsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
  });
