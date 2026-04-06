import { BNW, COLORS, SHARED } from "@/constants/colors";
import { ColorModeProps, TColors } from "@/constants/types";
import { settingsService } from "@/store/dbServices";
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
      const storedMode = (await settingsService.get("colorMode")) as ColorModeProps | null;

      if (storedMode) {
        setColorMode(storedMode);
      } else {
        setColorMode(systemColorScheme || "light");
      }
    };
    checkLocalStorage();
  }, [systemColorScheme]);

  const toggleColorMode = async () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
    await settingsService.set("colorMode", newMode);
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
