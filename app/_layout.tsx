import { ColorModeProvider } from "@/context/ColorModeContext";
import migrations from "@/drizzle/migrations";
import * as schema from "@/store/schema";
import { useGameScoresStore } from "@/store/store_zustand";
import { migrateSettings } from "@/utils/migrateSettings";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const DB_NAME = "sudoku.db";

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const expo = SQLite.openDatabaseSync(DB_NAME);
  const db = drizzle(expo, { schema });

  // TODO: check typ of db
  const initializeDB = async (db: any) => {
    try {
      await migrate(db, migrations);
      await seedInitialData(db);
      console.log("DB initialized");
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const seedInitialData = async (db: any) => {
    const levels = [
      { level: 1, name: "Easy" },
      { level: 2, name: "Medium" },
      { level: 3, name: "Hard" },
      { level: 4, name: "Expert" },
    ];

    for (const levelData of levels) {
      await db.insert(schema.levelStats).values(levelData).onConflictDoNothing();
    }

    await db.insert(schema.levelStats).values({ id: 1 }).onConflictDoNothing();
  };

  useEffect(() => {
    async function checkIsAppReady() {
      try {
        // TODO: Add any other async functions needed for app initialization,
        // such as loading fonts, fetching initial data, or authenticating the user.

        await useGameScoresStore.getState().loadFromDatabase();

        await migrateSettings();

        // initializeDB();
      } catch (error) {
        __DEV__ && console.log("App initialization error: ", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    checkIsAppReady();
  }, []);

  return (
    <SQLite.SQLiteProvider databaseName={DB_NAME} onInit={initializeDB}>
      <ColorModeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
          <Stack.Screen name="Game" options={{ headerShown: false, title: "Game" }} />
          <Stack.Screen name="Stats" options={{ headerShown: false, title: "Stats" }} />
          <Stack.Screen
            name="Instructions"
            options={{ headerShown: false, title: "Instructions" }}
          />
          <Stack.Screen name="Settings" options={{ headerShown: false, title: "Settings" }} />
          <Stack.Screen name="TestSQLite" options={{ headerShown: false, title: "TestSQLite" }} />
        </Stack>
      </ColorModeProvider>
    </SQLite.SQLiteProvider>
  );
}
