import { BNW, COLORS, SHARED } from "@/constants/colors";
import { ColorModeProps, TColors } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

/**
 * Defines the shape of the color mode context.
 */
interface ColorModeContextProps {
  /** The current color mode, either 'light' or 'dark'. */
  colorMode: ColorModeProps;
  /** An object containing the colors for the current theme. */
  colors: TColors;
  /** A function to toggle the color mode between 'light' and 'dark'. */
  toggleColorMode: () => void;
}

/**
 * Defines the props for the `ColorModeProvider` component.
 */
type ColorModeProviderProps = {
  /** The child components that will have access to the color mode context. */
  children: ReactNode;
};

/**
 * `ColorModeContext` is a React context that holds the application's color theme state.
 * It provides the current color mode, a set of theme-specific colors, and a function to toggle the mode.
 */
const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

/**
 * `ColorModeProvider` is a component that manages and provides the application's color theme.
 *
 * It performs the following functions:
 * 1. Detects the user's system-preferred color scheme.
 * 2. Reads the user's saved preference from `AsyncStorage` on startup.
 * 3. If no preference is saved, it defaults to the system's color scheme.
 * 4. Provides a `toggleColorMode` function to switch between 'light' and 'dark' modes.
 * 5. Persists the user's choice to `AsyncStorage` whenever the mode is toggled.
 * 6. Exposes the current `colorMode` and a corresponding `colors` object to its children.
 *
 * This provider should wrap the root of the application (e.g., in `_layout.tsx`).
 */
export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [colorMode, setColorMode] = useState<ColorModeProps>(systemColorScheme || "light");

  useEffect(() => {
    const checkLocalStorage = async () => {
      const storedMode = (await AsyncStorage.getItem("colorMode")) as ColorModeProps | null;
      if (storedMode) {
        setColorMode(storedMode);
      } else {
        setColorMode(systemColorScheme || "light");
      }
    };
    checkLocalStorage();
  }, [systemColorScheme]);

  const toggleColorMode = () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
    AsyncStorage.setItem("colorMode", newMode);
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

/**
 * `useColorMode` is a custom hook for consuming the `ColorModeContext`.
 * It provides an easy way to access the current theme (`colorMode`), `colors` object,
 * and the `toggleColorMode` function from any component within the `ColorModeProvider`.
 * @throws {Error} if used outside of a `ColorModeProvider`.
 */
export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};
