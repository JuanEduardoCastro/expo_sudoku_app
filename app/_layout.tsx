import { ColorModeProvider } from "@/context/ColorModeContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function checkIsAppReady() {
      try {
        // TODO: other asyn functions
      } catch (error) {
        __DEV__ && console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    checkIsAppReady();
  }, []);

  return (
    <ColorModeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
        <Stack.Screen name="Game" options={{ headerShown: false, title: "Game" }} />
        <Stack.Screen name="Stats" options={{ headerShown: false, title: "Stas" }} />
        <Stack.Screen name="Instructions" options={{ headerShown: false, title: "Instructions" }} />
        <Stack.Screen name="Settings" options={{ headerShown: false, title: "Settings" }} />
      </Stack>
    </ColorModeProvider>
  );
}
