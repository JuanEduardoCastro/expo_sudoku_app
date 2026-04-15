import { H_PAD, SW } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GlobalStatsCardProps = {
  title: string;
  value: string | number;
};

const GlobalStatsCard = ({ title, value }: GlobalStatsCardProps) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.statCard}>
      <Text style={styles.statCardValue}>{value}</Text>
      <Text style={styles.statCardLabel}>{title}</Text>
    </View>
  );
};

export default GlobalStatsCard;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    statCard: {
      backgroundColor: colors.surface,
      width: (SW - H_PAD * 2 - 10) / 2,
      flexGrow: 1,
      padding: 18,
      borderRadius: 16,
      paddingLeft: 24,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 4,
    },
    statCardValue: {
      fontSize: 30,
      fontWeight: "800",
      color: colors.text,
    },
    statCardLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.textMuted,
    },
  });
