import { CellProps } from "@/app/Game";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export type NumberCellProps = {
  cell: CellProps;
  selected?: boolean;
  highlighted?: boolean;
  editable?: boolean;
  onPress: (cell: CellProps) => void;
};

const NumberCell = ({ cell, selected, editable, highlighted, onPress }: NumberCellProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        highlighted && { backgroundColor: "lightgray" },
        selected && { backgroundColor: "gray" },
        cell.col === 2 || cell.col === 5 ? { borderRightWidth: 2 } : { borderRightWidth: 1 },
        cell.row === 2 || cell.row === 5 ? { borderBottomWidth: 2 } : { borderBottomWidth: 1 },
      ]}
      onPress={() => onPress(cell)}
    >
      <Text style={styles.numberText}>
        {cell.value !== null && cell.value !== 0 ? cell.value : ""}
      </Text>
    </Pressable>
  );
};

export default NumberCell;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "gray",
  },

  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c3a56",
  },
});
