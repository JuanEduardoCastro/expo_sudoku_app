import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ButtonBackProps = {
  title?: string;
  onPress?: () => void;
};

const ButtonBack = ({ title, onPress }: ButtonBackProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default ButtonBack;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {},
    backButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    backButtonText: {
      fontSize: 18,
      color: colors.text,
      fontWeight: "semibold",
    },
  });
