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
  const { colors, styles } = useStyles(createStyles);

  return (
    <Pressable onPress={onPress} style={styles.settingsLine}>
      {icon}
      <Text style={styles.settingsText}>{title}</Text>
      <Text style={styles.settingsDinamicText}> {value} </Text>
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
      width: "80%",
      fontSize: 16,
      color: colors.text,
      // textAlign: "right",
    },
    settingsDinamicText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
  });
