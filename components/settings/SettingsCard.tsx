import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { ReactElement } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
/**
 * Defines the properties for the `SettingsCard` component.
 */
type SettingsCardProps = {
  /** The main text or label for the setting. */
  title: string;
  /** An optional dynamic value to display, such as the current state of a setting. */
  value?: string | number;
  /** An optional icon to display next to the title. */
  icon?: ReactElement;
  /** An optional function to execute when the card is pressed. */
  onPress?: () => void;
};

/**
 * `SettingsCard` is a reusable component that renders a single setting option as a pressable row.
 * It is designed to be used within a list of settings, like in the `SettingsBlock` component.
 *
 * @param {SettingsCardProps} props - The properties for the component.
 * @returns {React.ReactElement} A pressable row displaying a setting's details.
 */
const SettingsCard = ({ title, value, icon, onPress }: SettingsCardProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <Pressable onPress={onPress} style={styles.settingsLine}>
      {icon}
      <Text style={styles.settingsText}>{title}</Text>
      {value ? <Text style={styles.settingsDinamicText}>{value}</Text> : null}
    </Pressable>
  );
};

export default SettingsCard;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    settingsLine: {
      alignItems: "center",
      flexDirection: "row",
      gap: 24,
    },
    settingsText: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    settingsDinamicText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
  });
