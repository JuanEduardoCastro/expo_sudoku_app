import { BNW, COLORS, SHARED } from "@/constants/colors";
import { ColorModeProps, TColors } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const checkLocalStorage = async () => {
      const isInMode = await AsyncStorage.getItem("colorMode");
      if (isInMode === "light") {
        setColorMode("light");
      } else if (isInMode === "dark") {
        setColorMode("dark");
      } else {
        setColorMode(systemColorScheme || "light");
      }
    };
    checkLocalStorage();
  }, []);

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
    if (colorMode === "light") {
      AsyncStorage.setItem("colorMode", "dark");
    } else if (colorMode === "dark") {
      AsyncStorage.setItem("colorMode", "light");
    } else {
      AsyncStorage.removeItem("colorMode");
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
