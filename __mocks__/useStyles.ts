import { ACCENT, BNW, COLORS, SHARED } from "@/constants/colors";
import { StyleSheet } from "react-native";

const mockColors = { ...COLORS.light, ...COLORS.dark, ...SHARED, ...BNW, ...ACCENT };

export default function useStyles(createsStyles: (colors: any) => any) {
  return {
    colors: mockColors,
    styles: StyleSheet.create(createsStyles(mockColors)),
  };
}
