import { scale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { ReactElement } from "react";
import { Pressable, StyleSheet } from "react-native";
import AppText from "../shared/AppText";

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
      <AppText style={styles.settingsText}>{title}</AppText>
      {value ? <AppText style={styles.settingsDinamicText}>{value}</AppText> : null}
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
