import { scale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { ReactElement } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type SettingsCardProps = {
  title: string;
  value?: string | number;
  icon?: ReactElement;
  onPress?: () => void;
};

const SettingsCard = ({ title, value, icon, onPress }: SettingsCardProps) => {
  const { styles } = useStyles(createStyles);

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
      backgroundColor: colors.surface,
      alignItems: "center",
      flexDirection: "row",
      padding: scale(16),
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: scale(16),
    },
    settingsText: {
      flex: 1,
      ...textVar.base,
      color: colors.text,
    },
    settingsDinamicText: {
      ...textVar.baseBold,
      color: colors.text,
    },
  });
