import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

/**
 * Defines the return type for the `useStyles` hook.
 */
export interface Styles<T extends StyleSheet.NamedStyles<T>> {
  /** An object containing the colors for the current theme. */
  colors: TColors;
  /** The theme-aware stylesheet object. */
  styles: T;
}

/**
 * A custom hook for creating theme-aware React Native stylesheets.
 *
 * This hook integrates with the `useColorMode` context to provide the current
 * theme's colors to a style factory function. It memoizes the resulting
 * stylesheet, ensuring it is only recalculated when the theme changes,
 * which optimizes performance by preventing unnecessary re-renders.
 *
 * @template T The type of the stylesheet, extending `StyleSheet.NamedStyles<T>`.
 * @param createStyles A factory function that receives the `colors` object and returns a stylesheet.
 * @returns {Styles<T>} An object containing the current `colors` and the memoized `styles`.
 *
 * @example
 * const MyComponent = () => {
 *   const { styles } = useStyles(createStyles);
 *   return <View style={styles.container} />;
 * }
 *
 * const createStyles = (colors: TColors) => StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.background,
 *   }
 * });
 */
export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (colors: TColors) => T
): Styles<T> {
  const { colors } = useColorMode();

  const styles = useMemo(() => createStyles(colors), [colors]);

  return { colors, styles };
}
