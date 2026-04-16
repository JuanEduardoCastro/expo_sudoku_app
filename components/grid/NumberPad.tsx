import { numbersPad } from "@/constants/initialGrid";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type NumberPadProps = {
  onPress: (number: number) => void;
  clueCell?: number | null;
  completedNumbers?: Set<number>;
};

const NumberPad = ({ onPress, clueCell, completedNumbers }: NumberPadProps) => {
  const { colors, styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      {numbersPad.map((number, index) => (
        <Pressable
          disabled={completedNumbers?.has(number)}
          style={[
            styles.numberBox,
            completedNumbers?.has(number) && { opacity: 0.4 },
            number === clueCell && {
              backgroundColor: colors.accentBase,
              borderColor: colors.accentSoft,
            },
          ]}
          key={index}
          onPress={() => onPress(number)}
        >
          <Text
            style={[
              styles.numberText,
              { color: number === clueCell ? colors.accentLight : colors.text },
              completedNumbers?.has(number) && { color: colors.cellGiven },
            ]}
          >
            {number}
          </Text>
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
      backgroundColor: colors.surface,
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.border,
    },
    numberText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
