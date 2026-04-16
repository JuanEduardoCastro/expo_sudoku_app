import { desc, eq } from "drizzle-orm";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import * as schema from "./schema";

// const expo = openDatabaseSync("sudoku.db");
// export const db = drizzle(expo, { schema });

let db: ExpoSQLiteDatabase<typeof schema>;

export const initializeDbInstance = (rawDb: SQLiteDatabase) => {
  db = drizzle(rawDb, { schema });
};

export const settingsService = {
  async get(key: string): Promise<string | null> {
    const result = await db
      .select()
      .from(schema.settings)
      .where(eq(schema.settings.key, key))
      .limit(1);

    return result[0]?.value ?? null;
  },

  async set(key: string, value: string): Promise<void> {
    await db
      .insert(schema.settings)
      .values({ key, value })
      .onConflictDoUpdate({
        target: schema.settings.key,
        set: { value, updateAt: new Date() },
      });
  },

  async remove(key: string): Promise<void> {
    await db.delete(schema.settings).where(eq(schema.settings.key, key));
  },
};

export const gameScoresService = {
  async create(gameScore: schema.NewGameScores): Promise<schema.GameScores> {
    const result = await db.insert(schema.gameScores).values(gameScore).returning();
    return result[0];
  },

  async getAll(): Promise<schema.GameScores[]> {
    return await db.select().from(schema.gameScores);
  },

  async getByLevel(limit: number = 10, level: number): Promise<schema.GameScores[]> {
    return await db
      .select()
      .from(schema.gameScores)
      .where(eq(schema.gameScores.level, level))
      .orderBy(desc(schema.gameScores.completedAt))
      .limit(limit);
  },

  async getRecent(limit: number = 10): Promise<schema.GameScores[]> {
    return await db
      .select()
      .from(schema.gameScores)
      .orderBy(desc(schema.gameScores.completedAt))
      .limit(limit);
  },
};

export const globalStatsService = {
  async get(): Promise<schema.GlobalStats | null> {
    const result = await db
      .select()
      .from(schema.globalStats)
      .where(eq(schema.globalStats.id, 1))
      .limit(1);

    return result[0] ?? null;
  },

  async update(stats: Partial<schema.GlobalStats>): Promise<void> {
    await db
      .update(schema.globalStats)
      .set({ ...stats, updateAt: new Date() })
      .where(eq(schema.globalStats.id, 1));
  },

  async incrementAfterGame(gameScore: schema.GameScores): Promise<void> {
    const current = await this.get();

    if (!current) {
      throw new Error("Global stats not found");
    }

    await this.update({
      maxPoints: Math.max(current.maxPoints, gameScore.points),
      totalGames: current.totalGames + 1,
      perfectGames: current.perfectGames + (gameScore.isPerfect ? 1 : 0),
      goodGames: current.goodGames + (gameScore.isGood ? 1 : 0),
      completedGames: current.completedGames + 1,
      totalTimePlay: current.totalTimePlay + gameScore.timeSeconds,
    });
  },
};

export const levelStatsService = {
  async getAll(): Promise<schema.LevelStats[]> {
    return await db.select().from(schema.levelStats).orderBy(schema.levelStats.level);
  },

  async getByLevel(level: number): Promise<schema.LevelStats | null> {
    const result = await db
      .select()
      .from(schema.levelStats)
      .where(eq(schema.levelStats.level, level))
      .limit(1);
    return result[0] ?? null;
  },

  async update(level: number, stats: Partial<schema.LevelStats>): Promise<void> {
    await db
      .update(schema.levelStats)
      .set({ ...stats, updatedAt: new Date() })
      .where(eq(schema.levelStats.level, level));
  },

  async incrementAfterGame(gameScore: schema.GameScores): Promise<void> {
    const current = await this.getByLevel(gameScore.level);

    if (!current) {
      throw new Error("Level stats not found");
    }

    const isWin = !gameScore.lostStreak;
    const newStreak = isWin ? current.currentStreak + 1 : 0;

    await this.update(gameScore.level, {
      maxPoints: Math.max(current.maxPoints, gameScore.points),
      totalGames: current.totalGames + 1,
      bestTime:
        current.bestTime === 0
          ? gameScore.timeSeconds
          : Math.min(current.bestTime, gameScore.timeSeconds),
      currentStreak: newStreak,
    });
  },
};

export const savedGamesService = {
  async save(gameState: schema.NewSavedGames): Promise<schema.SavedGames> {
    await db.delete(schema.savedGames);
    const result = await db.insert(schema.savedGames).values(gameState).returning();
    return result[0];
  },

  async load(): Promise<schema.SavedGames | null> {
    const result = await db.select().from(schema.savedGames).limit(1);
    return result[0] ?? null;
  },

  async delete(): Promise<void> {
    await db.delete(schema.savedGames);
  },

  // async exists(): Promise<boolean> {
  //   const result = await db.select().from(schema.savedGames).limit(1);
  //   return result.length > 0;
  // },
};

export const saveCompletedGame = async (gameData: {
  level: number;
  points: number;
  timeSeconds: number;
  errorCount: number;
}): Promise<void> => {
  const isPerfect = gameData.errorCount === 0;
  const isGood = gameData.errorCount <= 3;
  const lostStreak = gameData.errorCount > 3;

  const gameScore = await gameScoresService.create({
    ...gameData,
    isPerfect,
    isGood,
    lostStreak,
  });

  await globalStatsService.incrementAfterGame(gameScore);
  await levelStatsService.incrementAfterGame(gameScore);

  __DEV__ && console.log("Game saved successfully:", gameScore);
};

export const clearAllData = async (): Promise<void> => {
  await db.delete(schema.gameScores);
  await db.delete(schema.savedGames);

  await globalStatsService.update({
    maxPoints: 0,
    totalGames: 0,
    perfectGames: 0,
    goodGames: 0,
    completedGames: 0,
    totalTimePlay: 0,
  });

  const levels = await levelStatsService.getAll();

  for (const level of levels) {
    await levelStatsService.update(level.level, {
      maxPoints: 0,
      totalGames: 0,
      bestTime: 0,
      currentStreak: 0,
    });
  }

  __DEV__ && console.log("All data cleared successfully.");
};
