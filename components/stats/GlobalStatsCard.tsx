import { H_PAD, moderateScale, scale, SW, verticalScale } from "@/constants/dimensions";
import { textVar } from "@/constants/textVar";
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
      paddingVertical: verticalScale(18),
      paddingHorizontal: scale(18),
      borderRadius: moderateScale(16),
      paddingLeft: 24,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 4,
    },
    statCardValue: {
      ...textVar.titleBold,
      color: colors.text,
    },
    statCardLabel: {
      ...textVar.small,
      color: colors.textMuted,
    },
  });
