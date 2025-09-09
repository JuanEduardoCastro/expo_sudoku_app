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

export type NumberCellProps = {
  cell: CellProps;
  selected?: boolean;
  highlighted?: boolean;
  rotatesCells?: boolean;
  editable?: boolean;
  onPress: (cell: CellProps) => void;
  rotate?: boolean;
  setRotate?: (rotate: boolean) => void;
};

const NumberCell = ({
  cell,
  selected,
  editable,
  highlighted,
  rotatesCells,
  onPress,
  rotate,
  setRotate,
}: NumberCellProps) => {
  const rotation = useSharedValue(0);

  const AnimatedText = Animated.createAnimatedComponent(Text);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
      // fontSize: 36,
    };
  });

  useEffect(() => {
    if (rotate === true) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 800, easing: Easing.linear }),
        1,
        false
      );
    }
    return () => {
      setTimeout(() => {
        rotation.value = 0;
        setRotate && setRotate(false);
      }, 801);
    };
  }, [rotate]);

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
