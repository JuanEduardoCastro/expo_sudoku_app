import { ColorModeProvider } from "@/context/ColorModeContext";
import migrations from "@/drizzle/migrations";
import { savedGamesService } from "@/store/dbServices";
import * as schema from "@/store/schema";
import { useBoardStore, useGameScoresStore } from "@/store/store_zustand";
import { migrateSettings } from "@/utils/migrateSettings";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";

const DB_NAME = "sudoku.db";

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // TODO: check type of db
  const initializeDB = async (rawDb: any) => {
    try {
      const drizzleDB = drizzle(rawDb, { schema });
      await migrate(drizzleDB, migrations);
      await seedInitialData(drizzleDB);
      await migrateSettings();
      await useGameScoresStore.getState().loadFromDatabase();
      const savedGame = await savedGamesService.load();
      if (savedGame) {
        useBoardStore.getState().setHasSavedGame(true);
        useBoardStore.getState().setSavedGameLevel(savedGame.level ?? null);
      }

      __DEV__ && console.log("DB initialized");
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      await SplashScreen.hideAsync();
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

    await db.insert(schema.globalStats).values({ id: 1 }).onConflictDoNothing();
  };

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
          <Stack.Screen
            name="DesignPreview"
            options={{ headerShown: false, title: "DesignPreview" }}
          />
        </Stack>
      </ColorModeProvider>
    </SQLite.SQLiteProvider>
  );
}
