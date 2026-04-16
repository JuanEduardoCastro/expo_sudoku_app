import { moderateScale, scale } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export type ButtonBackProps = {
  title?: string;
  onPress?: () => void;
};

const ButtonBack = ({ title, onPress }: ButtonBackProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <Pressable
      accessibilityLabel="Go back"
      accessibilityRole="button"
      onPress={onPress}
      style={styles.backButton}
      hitSlop={12}
    >
      <Text style={{ color: colors.accentBase, fontSize: moderateScale(26), lineHeight: 30 }}>
        ‹
      </Text>
    </Pressable>
  );
};

export default ButtonBack;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    backButton: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: scale(10),
    },
    backButtonText: {
      fontSize: moderateScale(26),
      color: colors.text,
      fontWeight: "semibold",
    },
  });
