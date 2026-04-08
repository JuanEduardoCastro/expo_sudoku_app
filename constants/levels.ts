import { LevelSchemeProps } from "./types";

export type LevelConfig = {
  id: number;
  name: string;
  difficulty: number;
  clues: number;
  scoreMultiplier: number;
};

export const LEVEL_CONFIG: Record<number, LevelConfig> = {
  1: {
    id: 1,
    name: "Easy",
    difficulty: 0.54,
    clues: 3,
    scoreMultiplier: 24,
  },
  2: {
    id: 2,
    name: "Medium",
    difficulty: 0.6,
    clues: 2,
    scoreMultiplier: 40,
  },
  3: {
    id: 3,
    name: "Hard",
    difficulty: 0.65,
    clues: 1,
    scoreMultiplier: 80,
  },
  4: {
    id: 4,
    name: "Expert",
    difficulty: 0.7,
    clues: 1,
    scoreMultiplier: 150,
  },
};

export const getLevels = (style: LevelSchemeProps) => [
  { ...LEVEL_CONFIG[1], color: style.easy, sub: "A gentle start" },
  { ...LEVEL_CONFIG[2], color: style.medium, sub: "Getting interesting" },
  { ...LEVEL_CONFIG[3], color: style.hard, sub: "True focus required" },
  { ...LEVEL_CONFIG[4], color: style.expert, sub: "For the dedicated ones" },
];

export const TEST_LEVEL: LevelConfig = {
  id: 0,
  name: "Test",
  difficulty: 0.05,
  clues: 5,
  scoreMultiplier: 10,
};
