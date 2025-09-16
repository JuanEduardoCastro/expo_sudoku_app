import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

type SettingsCardProps = {
  title: string;
  value?: string | number;
  icon?: ReactElement;
};

const SettingsCard = ({ title, value, icon }: SettingsCardProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <View style={styles.settingsLine}>
      {icon}
      <Text style={styles.settingsText}>{title}</Text>
      <Text style={styles.settingsDinamicText}> {value} </Text>
    </View>
  );
};

export default SettingsCard;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    settingsLine: {
      alignItems: "center",
      flexDirection: "row",
      gap: 12,
    },
    settingsText: {
      width: "40%",
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
