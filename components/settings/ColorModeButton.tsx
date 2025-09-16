import { ColorModeIcon } from "@/assets/svgs";
import { TColors } from "@/constants/types";
import { useColorMode } from "@/context/ColorModeContext";
import useStyles from "@/hooks/useStyles";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type ColorModeButtonProps = {
  width?: number;
  height?: number;
  color?: string;
  onPress?: () => void;
};

const ColorModeButton = ({ width = 32, height = 32, color, onPress }: ColorModeButtonProps) => {
  const { colors, styles } = useStyles(createStyles);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggleColorMode = () => {
    toggleColorMode();
  };

  return (
    <Pressable onPress={handleToggleColorMode} style={[styles.container, { width, height }]}>
      {/* TODO: create icon for toggle color mode */}
      <ColorModeIcon width={24} height={24} color={colors.tint} />
    </Pressable>
  );
};

export default ColorModeButton;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      // padding: "0.8%",
      backgroundColor: colors.background,
    },
  });
