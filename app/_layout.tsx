import { ColorModeProvider } from "@/context/ColorModeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
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
