import { StyleSheet } from "react-native";
import { BNW, COLORS, SHARED } from "./colors";

export type ColorModeProps = "light" | "dark";

export type StylesModeProps = {
  background: string;
  background2: string;
  text: string;
  tint: string;
};

export type ColorsNameProps = {
  light: StylesModeProps;
  dark: StylesModeProps;
};

export type TColors = typeof COLORS.light & typeof COLORS.dark & typeof SHARED & typeof BNW;

export interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}
