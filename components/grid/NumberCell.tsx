import { CellProps } from "@/app/Game";
import { CELL_SIZE } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import useStyles from "@/hooks/useStyles";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
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

const AnimatedText = Animated.createAnimatedComponent(Text);

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
  const { colors, styles } = useStyles(createStyles);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  useEffect(() => {
    if (rotate === true) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 100, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 100, easing: Easing.in(Easing.quad) }),
      );
      rotation.value = withRepeat(
        withTiming(360, { duration: 800, easing: Easing.inOut(Easing.cubic) }),
        1,
        false,
      );
    }
    return () => {
      setTimeout(() => {
        rotation.value = 0;
        setRotate && setRotate(false);
      }, 701);
    };
  }, [rotate]);

  return (
    <Pressable
      style={[
        styles.container,
        highlighted && { backgroundColor: colors.accentBase + 28 },
        selected && {
          backgroundColor: colors.accentBase,
          // borderWidth: 3,
          // borderColor: colors.border,
        },
        cell.col === 2 || cell.col === 5
          ? { borderRightWidth: 2, borderRightColor: colors.border }
          : { borderRightWidth: 0.5, borderRightColor: colors.border },
        cell.row === 2 || cell.row === 5
          ? { borderBottomWidth: 2, borderBottomColor: colors.border }
          : { borderBottomWidth: 0.5, borderBottomColor: colors.border },
      ]}
      onPress={() => onPress(cell)}
    >
      <AnimatedText
        style={[
          styles.numberText,
          rotatesCells && animatedStyle,
          selected && animatedStyle,
          selected && { color: colors.accentLight },
        ]}
      >
        {cell.value !== null && cell.value !== 0 ? cell.value : ""}
      </AnimatedText>
    </Pressable>
  );
};

export default NumberCell;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      alignItems: "center",
      justifyContent: "center",
      // borderColor: colors.border,
    },

    numberText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
  });
