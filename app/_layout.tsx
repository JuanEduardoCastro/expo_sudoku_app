import { ColorModeProvider } from "@/context/ColorModeContext";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

/**
 * Configures the global splash screen behavior for the application.
 * - `duration`: The time in milliseconds the splash screen will be visible.
 * - `fade`: Enables a fade-out animation when the splash screen hides.
 */
SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * The root layout component for the application.
 * It sets up the main navigation stack using Expo Router, wraps the app in necessary
 * context providers (like `ColorModeProvider`), and manages the splash screen visibility.
 */

/* 

scoreByGame {
  user ->
  id ->
  level
  score
  time
  errorCount
  lostStreak
  createdAt


*/
export default function RootLayout() {
  // const createDb = async (db: SQLiteDatabase) => {
  //   await db.execAsync(
  //     "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);"
  //   );
  // };

  const expo = SQLite.openDatabaseSync("db.db");
  const db = drizzle(expo);

  /**
   * Effect to hide the splash screen once the app is ready.
   * This can be extended to wait for fonts to load, data to be fetched, etc.
   */
  useEffect(() => {
    async function checkIsAppReady() {
      try {
        // TODO: Add any other async functions needed for app initialization,
        // such as loading fonts, fetching initial data, or authenticating the user.
      } catch (error) {
        __DEV__ && console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    checkIsAppReady();
  }, []);

  return (
    // <SQLiteProvider databaseName="test.db" onInit={createDb}>
    <ColorModeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
        <Stack.Screen name="Game" options={{ headerShown: false, title: "Game" }} />
        <Stack.Screen name="Stats" options={{ headerShown: false, title: "Stats" }} />
        <Stack.Screen name="Instructions" options={{ headerShown: false, title: "Instructions" }} />
        <Stack.Screen name="Settings" options={{ headerShown: false, title: "Settings" }} />
        <Stack.Screen name="TestSQLite" options={{ headerShown: false, title: "TestSQLite" }} />
      </Stack>
    </ColorModeProvider>
    // </SQLiteProvider>
  );
}
