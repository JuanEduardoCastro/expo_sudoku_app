import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Props for the `ButtonBack` component.
 */
export type ButtonBackProps = {
  /** The text to display on the button. @deprecated This prop is not used; the text is hardcoded to "Back". */
  title?: string;
  /** Function to be called when the button is pressed. */
  onPress?: () => void;
};

/**
 * A simple, reusable "Back" button component.
 * It's typically used in headers to provide navigation to the previous screen.
 */
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
      color: "#1c3a56",
      fontWeight: "semibold",
    },
  });
