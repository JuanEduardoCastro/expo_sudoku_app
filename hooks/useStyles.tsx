import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import { StyleSheet } from "react-native";

export interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStlyes: (colors: TColors) => T
): Styles<T> {
  const { colors } = useColorMode();

  return {
    colors: colors,
    styles: createStlyes(colors),
  };
}
