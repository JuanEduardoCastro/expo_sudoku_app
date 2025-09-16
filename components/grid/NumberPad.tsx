import { numbersPad } from "@/constants/initialGrid";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Props for the `NumberPad` component.
 */
export type NumberPadProps = {
  /** Callback function triggered when a number on the pad is pressed. */
  onPress: (number: number) => void;
  /** The number value of a cell revealed by a "clue", to be highlighted on the pad. */
  clueCell?: number | null;
  /** The currently selected number on the pad (for visual feedback). */
  selectedPad?: number | null;
};

/**
 * `NumberPad` is a component that displays a row of numbers (1-9) for the user to input into the Sudoku grid.
 * It also provides visual feedback for clues.
 */
const NumberPad = ({ onPress, clueCell, selectedPad }: NumberPadProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      {numbersPad.map((number, index) => (
        <Pressable
          style={[
            styles.numberBox,
            number === clueCell && { borderWidth: 4, borderColor: "blue" },
            selectedPad === number
              ? { borderColor: "blue", borderWidth: 2 }
              : { borderColor: "gray" },
          ]}
          key={index}
          onPress={() => onPress(number)}
        >
          <Text style={styles.numberText}>{number}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default NumberPad;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    numberBox: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 4,
    },
    numberText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
