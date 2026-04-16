import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ColorModeProvider } from "@/context/ColorModeContext";
import migrations from "@/drizzle/migrations";
import { initializeDbInstance, savedGamesService } from "@/store/dbServices";
import * as schema from "@/store/schema";
import { useBoardStore, useGameScoresStore } from "@/store/store_zustand";
import { migrateSettings } from "@/utils/migrateSettings";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";

const DB_NAME = "sudoku.db";

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const initializeDB = async (rawDb: SQLite.SQLiteDatabase) => {
    try {
      initializeDbInstance(rawDb);
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

  const seedInitialData = async (db: ExpoSQLiteDatabase<typeof schema>) => {
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
    <ErrorBoundary>
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

            <Stack.Screen
              name="DesignPreview"
              options={{ headerShown: false, title: "DesignPreview" }}
            />
          </Stack>
        </ColorModeProvider>
      </SQLite.SQLiteProvider>
    </ErrorBoundary>
  );
}
