import { CellProps } from "@/app/Game";
import { CELL_SIZE } from "@/constants/dimensions";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
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
  isError?: boolean;
  onPress: (cell: CellProps) => void;
  rotate?: boolean;
  setRotate?: (rotate: boolean) => void;
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const NumberCell = ({
  cell,
  selected,
  editable,
  isError,
  highlighted,
  rotatesCells,
  onPress,
  rotate,
  setRotate,
}: NumberCellProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { colorMode } = useColorMode();
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
      }, 830);
    };
  }, [rotate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Pressable
      accessibilityLabel={
        cell.value
          ? `Row ${cell.row + 1}, column ${cell.col + 1} value ${cell.value}${!cell.editable ? ", given" : ""}`
          : `Row ${cell.row + 1}, column ${cell.col + 1}, empty`
      }
      accessibilityHint={cell.editable ? "Double tap to select" : undefined}
      accessibilityRole="button"
      accessibilityState={{ selected: selected }}
      style={[
        styles.container,
        highlighted && {
          backgroundColor: colorMode === "dark" ? colors.accentBase + 28 : colors.accentLight,
        },
        selected && {
          backgroundColor: colors.accentBase,
          // borderWidth: 3,
          // borderColor: colors.border,
        },
        cell.col === 2 || cell.col === 5
          ? {
              borderRightWidth: 2,
              borderRightColor: colorMode === "dark" ? colors.border : colors.veryLightGray,
            }
          : {
              borderRightWidth: 0.5,
              borderRightColor: colorMode === "dark" ? colors.border : colors.veryLightGray,
            },
        cell.row === 2 || cell.row === 5
          ? {
              borderBottomWidth: 2,
              borderBottomColor: colorMode === "dark" ? colors.border : colors.veryLightGray,
            }
          : {
              borderBottomWidth: 0.5,
              borderBottomColor: colorMode === "dark" ? colors.border : colors.veryLightGray,
            },
        isError && { backgroundColor: colors.danger + 16 },
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
    },

    numberText: {
      fontFamily: "SpaceMonoBold",
      fontSize: Math.round(CELL_SIZE * 0.62),
      color: colors.text,
    },
  });
