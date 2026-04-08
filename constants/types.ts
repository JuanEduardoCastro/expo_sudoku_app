import { StyleSheet } from "react-native";
import { ACCENT, BNW, COLORS, SCHEMES, SHARED } from "./colors";

export type ColorModeProps = "light" | "dark";

export type StylesModeProps = {
  background: string;
  surface: string;
  surface2: string;
  text: string;
  textMuted: string;
  border: string;
  cell: string;
  cellGiven: string;
};

export type AccentProps = {
  accentBase: string;
  accentSoft: string;
  accentLight: string;
};

export type ColorsNameProps = {
  light: StylesModeProps;
  dark: StylesModeProps;
};

export type LevelSchemeProps = {
  name: string;
  label: string;
  easy: string;
  medium: string;
  hard: string;
  expert: string;
};

export type TColors = typeof COLORS.light &
  typeof COLORS.dark &
  typeof SHARED &
  typeof BNW &
  typeof ACCENT &
  typeof SCHEMES;

export interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}
