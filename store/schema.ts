import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updateAt: integer("update_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const gameScores = sqliteTable("game_scores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  level: integer("level").notNull(), // 1=Easy, 2=Medium, 3=Hard, 4=Expert
  points: integer("points").notNull(),
  timeSeconds: integer("time_seconds").notNull(),
  errorCount: integer("error_count").notNull().default(0),
  isPerfect: integer("is_perfect", { mode: "boolean" }).notNull().default(false),
  isGood: integer("is_good", { mode: "boolean" }).notNull().default(false),
  lostStreak: integer("lost_streak", { mode: "boolean" }).notNull().default(false),
  completedAt: integer("completed_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const globalStats = sqliteTable("global_stats", {
  id: integer("id").primaryKey().default(1), // Allways 1 row
  maxPoints: integer("max_points").notNull().default(0),
  totalGames: integer("total_games").notNull().default(0),
  perfectGames: integer("perfect_games").notNull().default(0),
  goodGames: integer("good_games").notNull().default(0),
  completedGames: integer("completed_games").notNull().default(0),
  totalTimePlay: integer("total_time_play").notNull().default(0), // in seconds
  updateAt: integer("update_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const levelStats = sqliteTable("level_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  level: integer("level").notNull().unique(),
  name: text("name").notNull(), // Easy, Medium, Hard, Expert
  maxPoints: integer("max_points").notNull().default(0),
  totalGames: integer("total_games").notNull().default(0),
  bestTime: integer("best_time").notNull().default(0), // in seconds
  currentStreak: integer("current_streak").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const savedGames = sqliteTable("saved_games", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  level: integer("level").notNull(),
  boardState: text("board_state").notNull(), // JSON stringified Board
  solutionState: text("solution_state").notNull(), // JSON stringified Board
  currentScore: integer("current_score").notNull(),
  currentError: integer("current_error").notNull(),
  elapsedTime: integer("elapsed_time").notNull(), // seconds
  remainingClues: integer("remaining_clues").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Settings = typeof settings.$inferSelect;
export type NewSettings = typeof settings.$inferInsert;

export type GameScores = typeof gameScores.$inferSelect;
export type NewGameScores = typeof gameScores.$inferInsert;

export type GlobalStats = typeof globalStats.$inferSelect;
export type NewGlobalStats = typeof globalStats.$inferInsert;

export type LevelStats = typeof levelStats.$inferSelect;
export type NewLevelStats = typeof levelStats.$inferInsert;

export type SavedGames = typeof savedGames.$inferSelect;
export type NewSavedGames = typeof savedGames.$inferInsert;
