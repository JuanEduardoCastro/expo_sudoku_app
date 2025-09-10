import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
      <Stack.Screen name="Game" options={{ headerShown: false, title: "Game" }} />
      <Stack.Screen name="Stats" options={{ headerShown: false, title: "Stas" }} />
    </Stack>
  );
}
