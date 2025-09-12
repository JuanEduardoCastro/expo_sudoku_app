import { numbersPad } from "@/constants/initialGrid";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type NumberPadProps = {
  onPress: (number: number) => void;
  clueCell?: number | null;
  selectedPad?: number | null;
};

const NumberPad = ({ onPress, clueCell, selectedPad }: NumberPadProps) => {
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

const styles = StyleSheet.create({
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
