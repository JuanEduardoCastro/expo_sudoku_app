import { CellProps } from "@/app/Game";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/**
 * Props for the `NumberCell` component.
 */
export type NumberCellProps = {
  /** The data object for the cell, containing its row, column, value, and editable status. */
  cell: CellProps;
  /** A boolean indicating if the cell is currently selected by the user. */
  selected?: boolean;
  /** A boolean indicating if the cell should be highlighted as part of a selected row, column, or grid. */
  highlighted?: boolean;
  /** A boolean indicating if this cell is part of a set that should animate (rotate). */
  rotatesCells?: boolean;
  /** A boolean indicating if the cell's value is user-editable. */
  editable?: boolean;
  /** Callback function triggered when the cell is pressed. */
  onPress: (cell: CellProps) => void;
  /** A boolean that triggers the rotation animation. */
  rotate?: boolean;
  /** Callback to reset the rotation trigger after the animation completes. */
  setRotate?: (rotate: boolean) => void;
  /** Callback to deselect the cell after the animation. */
  setSelectedCell?: (cell: CellProps | null) => void;
  /** Callback to clear all highlighted cells after the animation. */
  setHighlightedCells?: (highlightedCells: Set<string>) => void;
};

/**
 * `NumberCell` is a component that renders a single cell in the Sudoku grid.
 * It handles its own styling based on whether it's selected, highlighted, or part of a completed
 * line/grid. It also contains the animation logic for when a line/grid is completed.
 */
const NumberCell = ({
  cell,
  selected,
  editable,
  highlighted,
  rotatesCells,
  onPress,
  rotate,
  setRotate,
  setSelectedCell,
  setHighlightedCells,
}: NumberCellProps) => {
  const rotation = useSharedValue(0);

  const AnimatedText = Animated.createAnimatedComponent(Text);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      // fontSize: 36,
    };
  });

  /**
   * Effect to trigger the rotation animation when the `rotate` prop is true.
   * The cleanup function resets the animation and the related board state
   * (selection, highlights) after the animation has finished.
   */
  useEffect(() => {
    if (rotate === true) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 700, easing: Easing.linear }),
        1,
        false
      );
    }
    return () => {
      setTimeout(() => {
        rotation.value = 0;
        setRotate && setRotate(false);
        setSelectedCell && setSelectedCell(null);
        setHighlightedCells && setHighlightedCells(new Set());
      }, 701);
    };
  }, [rotate]);

  return (
    <Pressable
      style={[
        styles.container,
        highlighted && { backgroundColor: "lightgray" },
        selected && { backgroundColor: "lightgray", borderWidth: 3, borderColor: "gray" },
        cell.col === 2 || cell.col === 5 ? { borderRightWidth: 2 } : { borderRightWidth: 1 },
        cell.row === 2 || cell.row === 5 ? { borderBottomWidth: 2 } : { borderBottomWidth: 1 },
      ]}
      onPress={() => onPress(cell)}
    >
      <AnimatedText
        style={[styles.numberText, rotatesCells && animatedStyle, selected && animatedStyle]}
      >
        {cell.value !== null && cell.value !== 0 ? cell.value : ""}
      </AnimatedText>
      {/* <Text style={styles.numberText}>
        {cell.value !== null && cell.value !== 0 ? cell.value : ""}
      </Text> */}
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
