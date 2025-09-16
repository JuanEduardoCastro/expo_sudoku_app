import { BNW, COLORS, SHARED } from "@/constants/colors";
import { ColorModeProps, TColors } from "@/constants/types";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface ColorModeContextProps {
  colorMode: ColorModeProps;
  colors: TColors;
  toggleColorMode: () => void;
}

type ColorModeProviderProps = {
  children: ReactNode;
};

const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [colorMode, setColorMode] = useState<ColorModeProps>(systemColorScheme || "light");

  useEffect(() => {
    // TODO: check Local Storage for color mode
  }, []);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
    if (colorMode === "light") {
      //TODO: save in Local Storage dark mode
    } else if (colorMode === "dark") {
      //TODO: save in Local Storage light mode
    } else {
      //TODO: remove in Local Storage mode
    }
  };

  const colors =
    colorMode === "light"
      ? { ...COLORS.light, ...SHARED, ...BNW }
      : { ...COLORS.dark, ...SHARED, ...BNW };

  return (
    <ColorModeContext.Provider value={{ colorMode, colors, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};
