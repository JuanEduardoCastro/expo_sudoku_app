import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: TColors) => T,
): Styles<T> {
  const { colors } = useColorMode();

  const styles = useMemo(() => createStyles(colors), [colors]);

  return { colors, styles };
}
