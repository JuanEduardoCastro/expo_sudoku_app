import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ColorModeProvider } from "@/context/ColorModeContext";
import migrations from "@/drizzle/migrations";
import { initializeDbInstance, savedGamesService } from "@/store/dbServices";
import * as schema from "@/store/schema";
import { useBoardStore, useGameScoresStore } from "@/store/store_zustand";
import { migrateSettings } from "@/utils/migrateSettings";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";

const DB_NAME = "sudoku.db";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceMonoBold: require("../assets/fonts/SpaceMono-Bold.ttf"),
  });
  const initializeDB = async (rawDb: SQLite.SQLiteDatabase) => {
    try {
      initializeDbInstance(rawDb);
      const drizzleDB = drizzle(rawDb, { schema });
      await migrate(drizzleDB, migrations);
      await seedInitialData(drizzleDB);
      await migrateSettings();
      await useGameScoresStore.getState().loadFromDatabase();

      // TEMP: hardcoded stats for screenshot — remove after
      if (__DEV__) {
        useGameScoresStore.getState().setGlobalScores({
          maxPoints: 12480,
          totalGames: 63,
          perfectGames: 18,
          goodGames: 44,
          completedGames: 63,
          totalTimePlay: 28493, // 8 hours in seconds
        });
        useGameScoresStore.getState().setScoresByLevels([
          { level: 1, name: "Easy", maxPoints: 4200, totalGames: 24, bestTime: 142, streak: 8 },
          { level: 2, name: "Medium", maxPoints: 7800, totalGames: 19, bestTime: 310, streak: 5 },
          { level: 3, name: "Hard", maxPoints: 11200, totalGames: 14, bestTime: 520, streak: 3 },
          { level: 4, name: "Expert", maxPoints: 12480, totalGames: 6, bestTime: 890, streak: 1 },
        ]);
      }

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

  if (!fontsLoaded) return null;

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
          <Stack screenOptions={{ contentStyle: { backgroundColor: "#0D0D1B" } }}>
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
