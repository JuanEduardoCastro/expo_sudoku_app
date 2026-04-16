import {
  gameScoresService,
  globalStatsService,
  levelStatsService,
  saveCompletedGame,
} from "@/store/dbServices";
import { GameScores, GlobalStats, LevelStats } from "@/store/schema";

jest.mock("expo-sqlite", () => ({
  openDatabaseSync: jest.fn(() => ({})),
}));

jest.mock("drizzle-orm/expo-sqlite", () => ({
  drizzle: jest.fn(() => ({})),
}));

jest.mock("drizzle-orm", () => ({
  eq: jest.fn(),
  desc: jest.fn(),
  sql: jest.fn(),
}));

const makeGameScore = (overrides: Partial<GameScores> = {}): GameScores => ({
  id: 1,
  level: 1,
  points: 200,
  timeSeconds: 90,
  errorCount: 0,
  isPerfect: true,
  isGood: true,
  lostStreak: false,
  completedAt: new Date(),
  ...overrides,
});

const makeGlobalStats = (overrides: Partial<GlobalStats> = {}): GlobalStats => ({
  id: 1,
  maxPoints: 500,
  totalGames: 5,
  perfectGames: 2,
  goodGames: 3,
  completedGames: 5,
  totalTimePlay: 300,
  updateAt: new Date(),
  ...overrides,
});

const makeLevelStats = (overrides: Partial<LevelStats> = {}): LevelStats => ({
  id: 1,
  level: 1,
  name: "Easy",
  maxPoints: 500,
  totalGames: 5,
  bestTime: 120,
  currentStreak: 3,
  updatedAt: new Date(),
  ...overrides,
});

describe("saveCompleteGame", () => {
  beforeEach(() => {
    jest.spyOn(gameScoresService, "create").mockResolvedValue(makeGameScore());
    jest.spyOn(globalStatsService, "incrementAfterGame").mockResolvedValue(undefined);
    jest.spyOn(levelStatsService, "incrementAfterGame").mockResolvedValue(undefined);
  });

  afterEach(() => jest.restoreAllMocks());

  it("sets isPerfect=true, isGood=true, lostStreak=false when errorCount is 0", async () => {
    await saveCompletedGame({ level: 1, points: 200, timeSeconds: 90, errorCount: 0 });

    expect(gameScoresService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        isPerfect: true,
        isGood: true,
        lostStreak: false,
      }),
    );
  });

  it("sets isPerfect=false, isGood=true, lostStrek=false when error count is 3", async () => {
    await saveCompletedGame({ level: 1, points: 200, timeSeconds: 90, errorCount: 3 });

    expect(gameScoresService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        isPerfect: false,
        isGood: true,
        lostStreak: false,
      }),
    );
  });

  it("sets isPerfect=false, isGood=false, lostStrek=true when error count is 4", async () => {
    await saveCompletedGame({ level: 1, points: 200, timeSeconds: 90, errorCount: 4 });

    expect(gameScoresService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        isPerfect: false,
        isGood: false,
        lostStreak: true,
      }),
    );
  });

  it("calls globalStateService and levelStateService after creating the score", async () => {
    await saveCompletedGame({ level: 1, points: 200, timeSeconds: 90, errorCount: 0 });

    expect(globalStatsService.incrementAfterGame).toHaveBeenCalledTimes(1);
    expect(levelStatsService.incrementAfterGame).toHaveBeenCalledTimes(1);
  });
});
