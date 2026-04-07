import { useColorMode } from "@/context/ColorModeContext";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ─── FIXED DESIGN TOKENS ──────────────────────────────────────────────────────

const PALETTE = {
  accent: "#5B6AF0",
  accentSoft: "#818CF8",
  accentLight: "#EEEFFE",

  light: {
    bg: "#F7F8FF",
    surface: "#FFFFFF",
    surface2: "#F0F1FD",
    text: "#1A1A38",
    textMuted: "#9294B0",
    border: "#E3E5F7",
    cell: "#FFFFFF",
    cellGiven: "#F2F3FC",
  },
  dark: {
    bg: "#0D0D1B",
    surface: "#17172B",
    surface2: "#20203A",
    text: "#EEEFFE",
    textMuted: "#6C6E92",
    border: "#28284A",
    cell: "#17172B",
    cellGiven: "#20203A",
  },
};

type C = typeof PALETTE.light;

// ─── LEVEL COLOR SCHEMES ──────────────────────────────────────────────────────
//
//  Each scheme uses one color family with 4 tones.
//  Tone 1 (lightest) = Easy, Tone 4 (darkest) = Expert.
//
// ──────────────────────────────────────────────────────────────────────────────

type LevelScheme = {
  name: string;
  label: string; // short label for the pill
  easy: string;
  medium: string;
  hard: string;
  expert: string;
};

const SCHEMES: Record<string, LevelScheme> = {
  violet: {
    name: "Violet",
    label: "Violet",
    easy: "#C4B5FD",
    medium: "#8B5CF6",
    hard: "#6D28D9",
    expert: "#4C1D95",
  },
  sky: {
    name: "Sky Blue",
    label: "Sky",
    easy: "#BAE6FD",
    medium: "#38BDF8",
    hard: "#0284C7",
    expert: "#0C4A6E",
  },
  teal: {
    name: "Teal",
    label: "Teal",
    easy: "#99F6E4",
    medium: "#2DD4BF",
    hard: "#0D9488",
    expert: "#134E4A",
  },
  rose: {
    name: "Rose",
    label: "Rose",
    easy: "#FECDD3",
    medium: "#FB7185",
    hard: "#E11D48",
    expert: "#881337",
  },
  amber: {
    name: "Amber",
    label: "Amber",
    easy: "#FEF08A",
    medium: "#FACC15",
    hard: "#CA8A04",
    expert: "#713F12",
  },
  emerald: {
    name: "Emerald",
    label: "Emerald",
    easy: "#A7F3D0",
    medium: "#34D399",
    hard: "#059669",
    expert: "#064E3B",
  },
  coral: {
    name: "Coral",
    label: "Coral",
    easy: "#FED7AA",
    medium: "#FB923C",
    hard: "#EA580C",
    expert: "#7C2D12",
  },
};

const SCHEME_KEYS = Object.keys(SCHEMES);

// ─── STATIC DATA ──────────────────────────────────────────────────────────────

const LEVEL_META = [
  { id: 1, key: "easy", name: "Easy", sub: "A gentle start" },
  { id: 2, key: "medium", name: "Medium", sub: "Getting interesting" },
  { id: 3, key: "hard", name: "Hard", sub: "True focus required" },
  { id: 4, key: "expert", name: "Expert", sub: "For the dedicated" },
] as const;

const getLevels = (s: LevelScheme) => [
  { ...LEVEL_META[0], color: s.easy },
  { ...LEVEL_META[1], color: s.medium },
  { ...LEVEL_META[2], color: s.hard },
  { ...LEVEL_META[3], color: s.expert },
];

const SAMPLE_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SELECTED_CELL = "4,4";
const PLAYER_FILLED = new Set(["0,2", "0,3", "1,1", "2,0", "3,1"]);
const HIGHLIGHTED = new Set<string>();
for (let i = 0; i < 9; i++) HIGHLIGHTED.add(`4,${i}`);
for (let i = 0; i < 9; i++) HIGHLIGHTED.add(`${i},4`);
for (let r = 3; r < 6; r++) for (let c = 3; c < 6; c++) HIGHLIGHTED.add(`${r},${c}`);

// ─── DIMENSIONS ───────────────────────────────────────────────────────────────

const { width: SW } = Dimensions.get("window");
const H_PAD = 24;
const BOARD_WIDTH = SW - H_PAD * 2;
const CELL_SIZE = Math.floor(BOARD_WIDTH / 9);
const PAD_GAP = 6;
const PAD_SIZE = Math.floor((BOARD_WIDTH - PAD_GAP * 8) / 9);

// ─── TABS ─────────────────────────────────────────────────────────────────────

type Tab = "home" | "game" | "stats" | "tokens";
const TABS: { key: Tab; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "game", label: "Game" },
  { key: "stats", label: "Stats" },
  { key: "tokens", label: "Tokens" },
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const DesignPreview = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c: C = isDark ? PALETTE.dark : PALETTE.light;
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("home");
  const [schemeKey, setSchemeKey] = useState("violet");
  const scheme = SCHEMES[schemeKey];
  const levels = getLevels(scheme);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
        {/* ── Top bar ── */}
        <View style={[s.topBar, { borderBottomColor: c.border }]}>
          <Pressable onPress={() => router.back()} style={s.backBtn} hitSlop={12}>
            <Text style={{ color: PALETTE.accent, fontSize: 26, lineHeight: 30 }}>‹</Text>
          </Pressable>
          <Text style={[s.topBarTitle, { color: c.text }]}>Design Preview</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* ── Color scheme picker ── */}
        <View style={[s.pickerWrap, { backgroundColor: c.surface, borderBottomColor: c.border }]}>
          <Text style={[s.pickerLabel, { color: c.textMuted }]}>LEVEL COLORS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.pickerRow}
          >
            {SCHEME_KEYS.map((key) => {
              const sch = SCHEMES[key];
              const isActive = key === schemeKey;
              return (
                <Pressable
                  key={key}
                  onPress={() => setSchemeKey(key)}
                  style={[
                    s.schemePill,
                    {
                      backgroundColor: isActive ? PALETTE.accentLight : c.surface2,
                      borderColor: isActive ? PALETTE.accent : c.border,
                    },
                  ]}
                >
                  {/* 4 tone dots */}
                  <View style={s.schemeDots}>
                    {[sch.easy, sch.medium, sch.hard, sch.expert].map((hex, i) => (
                      <View key={i} style={[s.schemeDot, { backgroundColor: hex }]} />
                    ))}
                  </View>
                  <Text style={[s.schemeName, { color: isActive ? PALETTE.accent : c.textMuted }]}>
                    {sch.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* ── Tab bar ── */}
        <View style={[s.tabBar, { backgroundColor: c.surface, borderBottomColor: c.border }]}>
          {TABS.map(({ key, label }) => (
            <Pressable
              key={key}
              style={[
                s.tabBtn,
                tab === key && { borderBottomWidth: 2, borderBottomColor: PALETTE.accent },
              ]}
              onPress={() => setTab(key)}
            >
              <Text style={[s.tabLabel, { color: tab === key ? PALETTE.accent : c.textMuted }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Content ── */}
        <ScrollView
          style={{ flex: 1, backgroundColor: c.bg }}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {tab === "home" && <HomeScreen c={c} isDark={isDark} scheme={scheme} levels={levels} />}
          {tab === "game" && <GameScreen c={c} isDark={isDark} scheme={scheme} levels={levels} />}
          {tab === "stats" && <StatsScreen c={c} isDark={isDark} scheme={scheme} levels={levels} />}
          {tab === "tokens" && <TokensScreen c={c} isDark={isDark} scheme={scheme} />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// ─── SHARED PROPS ─────────────────────────────────────────────────────────────

type Level = { id: number; name: string; sub: string; color: string };
type ScreenProps = {
  c: C;
  isDark: boolean;
  scheme: LevelScheme;
  levels: Level[];
};

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────

const HomeScreen = ({ c, isDark, levels }: ScreenProps) => (
  <View style={[s.screen, { backgroundColor: c.bg }]}>
    <View style={s.homeHero}>
      <Text style={[s.appName, { color: PALETTE.accent }]}>SUDOKU</Text>
      <Text style={[s.appTagline, { color: c.textMuted }]}>Focus. Logic. Clarity.</Text>
    </View>

    <View style={{ height: 36 }} />
    <Text style={[s.sectionLabel, { color: c.textMuted }]}>SELECT DIFFICULTY</Text>
    <View style={{ height: 12 }} />

    {levels.map((level) => (
      <View
        key={level.id}
        style={[
          s.levelCard,
          {
            backgroundColor: c.surface,
            borderColor: c.border,
            shadowColor: isDark ? "#000" : level.color,
          },
        ]}
      >
        <View style={[s.levelDot, { backgroundColor: level.color }]} />
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={[s.levelCardName, { color: c.text }]}>{level.name}</Text>
          <Text style={[s.levelCardSub, { color: c.textMuted }]}>{level.sub}</Text>
        </View>
        <View style={[s.levelArrow, { backgroundColor: level.color + "22" }]}>
          <Text style={{ color: level.color, fontSize: 18, fontWeight: "700", lineHeight: 22 }}>
            ›
          </Text>
        </View>
      </View>
    ))}

    <View style={{ height: 28 }} />

    <View style={s.homeNav}>
      {["Stats", "Settings", "How to play"].map((label) => (
        <View
          key={label}
          style={[s.homeNavBtn, { backgroundColor: c.surface, borderColor: c.border }]}
        >
          <Text style={[s.homeNavLabel, { color: c.text }]}>{label}</Text>
        </View>
      ))}
    </View>
  </View>
);

// ─── GAME SCREEN ──────────────────────────────────────────────────────────────

const GameScreen = ({ c, isDark, scheme }: ScreenProps) => {
  const strongBorder = isDark ? "#44446A" : "#9298D8";
  const easyColor = scheme.easy;

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      {/* Top bar */}
      <View style={[s.gameBar, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Text style={{ color: PALETTE.accent, fontSize: 24, width: 32 }}>‹</Text>
        <View style={[s.levelPill, { backgroundColor: easyColor + "28" }]}>
          <View style={[s.levelPillDot, { backgroundColor: easyColor }]} />
          <Text style={[s.levelPillText, { color: easyColor }]}>Easy</Text>
        </View>
        <Text style={[s.timerLabel, { color: c.textMuted }]}>05:32</Text>
      </View>

      <View style={{ height: 14 }} />

      {/* Score row */}
      <View style={[s.scoreCard, { backgroundColor: c.surface, borderColor: c.border }]}>
        <View style={s.scoreBlock}>
          <Text style={[s.scoreCaption, { color: c.textMuted }]}>SCORE</Text>
          <Text style={[s.scoreNum, { color: c.text }]}>1,240</Text>
        </View>
        <View style={[s.factorPill, { backgroundColor: PALETTE.accentLight }]}>
          <Text style={[s.factorX, { color: PALETTE.accent }]}>×</Text>
          <Text style={[s.factorNum, { color: PALETTE.accent }]}>18</Text>
        </View>
        <View style={s.scoreBlock}>
          <Text style={[s.scoreCaption, { color: c.textMuted }]}>ERRORS</Text>
          <View style={s.dotRow}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[s.errorDot, { backgroundColor: i < 2 ? scheme.hard : c.border }]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={{ height: 14 }} />

      {/* Board */}
      <View
        style={[
          s.boardWrap,
          {
            backgroundColor: c.surface,
            borderColor: c.border,
            shadowColor: isDark ? "#000" : "#7080C0",
          },
        ]}
      >
        {SAMPLE_BOARD.map((row, rIdx) => (
          <View key={rIdx} style={{ flexDirection: "row" }}>
            {row.map((val, cIdx) => {
              const key = `${rIdx},${cIdx}`;
              const isSelected = key === SELECTED_CELL;
              const isPlayer = PLAYER_FILLED.has(key);
              const isHigh = HIGHLIGHTED.has(key) && !isSelected;
              const isGiven = val !== 0 && !isPlayer;

              let bg = c.cell;
              if (isSelected) bg = PALETTE.accent;
              else if (isHigh) bg = isDark ? PALETTE.accent + "28" : PALETTE.accentLight;
              else if (isGiven) bg = c.cellGiven;

              const numColor = isSelected ? "#FFF" : isPlayer ? PALETTE.accent : c.text;

              return (
                <View
                  key={cIdx}
                  style={[
                    s.cell,
                    {
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      backgroundColor: bg,
                      borderRightWidth: cIdx === 2 || cIdx === 5 ? 2 : 0.5,
                      borderBottomWidth: rIdx === 2 || rIdx === 5 ? 2 : 0.5,
                      borderRightColor: cIdx === 2 || cIdx === 5 ? strongBorder : c.border,
                      borderBottomColor: rIdx === 2 || rIdx === 5 ? strongBorder : c.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: CELL_SIZE * 0.44,
                      fontWeight: isGiven ? "700" : "400",
                      color: numColor,
                      opacity: isGiven && !isSelected ? 0.85 : 1,
                    }}
                  >
                    {isSelected ? "3" : isPlayer ? "4" : val !== 0 ? val : ""}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={{ height: 14 }} />

      {/* Clue row */}
      <View style={s.clueRow}>
        <Text style={[s.clueCaption, { color: c.textMuted }]}>CLUES</Text>
        <View style={s.dotRow}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[s.clueDot, { backgroundColor: i < 2 ? scheme.medium : c.border }]}
            />
          ))}
        </View>
      </View>

      <View style={{ height: 14 }} />

      {/* Number pad */}
      <View style={[s.numPad, { gap: PAD_GAP }]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const active = n === 4;
          return (
            <View
              key={n}
              style={[
                s.padBtn,
                {
                  width: PAD_SIZE,
                  height: PAD_SIZE * 1.05,
                  backgroundColor: active ? PALETTE.accent : c.surface,
                  borderColor: active ? PALETTE.accent : c.border,
                  shadowColor: isDark ? "#000" : "#8090C0",
                },
              ]}
            >
              <Text style={[s.padBtnNum, { color: active ? "#FFF" : c.text }]}>{n}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// ─── STATS SCREEN ─────────────────────────────────────────────────────────────

const StatsScreen = ({ c, isDark, levels }: ScreenProps) => {
  const GLOBAL = [
    { label: "Total Games", value: "48" },
    { label: "Best Score", value: "3,840" },
    { label: "Perfect", value: "12" },
    { label: "Time Played", value: "14h 22m" },
  ];

  const LEVEL_STATS = [
    { ...levels[0], best: "03:14", games: 18, streak: 5 },
    { ...levels[1], best: "05:48", games: 14, streak: 3 },
    { ...levels[2], best: "09:22", games: 9, streak: 1 },
    { ...levels[3], best: "—", games: 7, streak: 0 },
  ];

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      <Text style={[s.pageTitle, { color: c.text }]}>Statistics</Text>

      <View style={{ height: 22 }} />
      <Text style={[s.sectionLabel, { color: c.textMuted }]}>GLOBAL</Text>
      <View style={{ height: 12 }} />

      <View style={s.statGrid}>
        {GLOBAL.map((stat) => (
          <View
            key={stat.label}
            style={[
              s.statCard,
              {
                backgroundColor: c.surface,
                borderColor: c.border,
                shadowColor: isDark ? "#000" : "#A0A8D8",
              },
            ]}
          >
            <Text style={[s.statCardValue, { color: c.text }]}>{stat.value}</Text>
            <Text style={[s.statCardLabel, { color: c.textMuted }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 28 }} />
      <Text style={[s.sectionLabel, { color: c.textMuted }]}>BY LEVEL</Text>
      <View style={{ height: 12 }} />

      {LEVEL_STATS.map((lvl) => (
        <View
          key={lvl.id}
          style={[
            s.levelStatRow,
            {
              backgroundColor: c.surface,
              borderColor: c.border,
              shadowColor: isDark ? "#000" : "#A0A8D8",
            },
          ]}
        >
          <View style={[s.levelStatBar, { backgroundColor: lvl.color }]} />
          <View style={{ flex: 1, paddingLeft: 14, paddingVertical: 12, gap: 4 }}>
            <Text style={[s.levelStatName, { color: c.text }]}>{lvl.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={[s.levelStatMeta, { color: c.textMuted }]}>Best {lvl.best}</Text>
              <Text style={[s.levelStatMeta, { color: c.border }]}>·</Text>
              <Text style={[s.levelStatMeta, { color: c.textMuted }]}>{lvl.games} games</Text>
            </View>
          </View>
          {lvl.streak > 0 && (
            <View style={[s.streakBadge, { backgroundColor: lvl.color + "22" }]}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: lvl.color }}>
                🔥 {lvl.streak}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

// ─── TOKENS SCREEN ────────────────────────────────────────────────────────────

const TokensScreen = ({ c, isDark, scheme }: { c: C; isDark: boolean; scheme: LevelScheme }) => {
  const swatches = [
    { name: "Accent", hex: PALETTE.accent },
    { name: "Accent Soft", hex: PALETTE.accentSoft },
    { name: "Accent Light", hex: PALETTE.accentLight },
    { name: `${scheme.label} · Easy`, hex: scheme.easy },
    { name: `${scheme.label} · Med`, hex: scheme.medium },
    { name: `${scheme.label} · Hard`, hex: scheme.hard },
    { name: `${scheme.label} · Expert`, hex: scheme.expert },
    { name: "Background", hex: c.bg },
    { name: "Surface", hex: c.surface },
    { name: "Text", hex: c.text },
    { name: "Muted", hex: c.textMuted },
    { name: "Border", hex: c.border },
  ];

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      <Text style={[s.pageTitle, { color: c.text }]}>Design Tokens</Text>
      <Text style={[s.tokenSubtitle, { color: c.textMuted }]}>
        Indigo accent · {scheme.name} level scale · Neutral surfaces
      </Text>

      <View style={{ height: 24 }} />
      <Text style={[s.sectionLabel, { color: c.textMuted }]}>PALETTE</Text>
      <View style={{ height: 14 }} />

      <View style={s.swatchGrid}>
        {swatches.map((sw) => (
          <View key={sw.name} style={s.swatchItem}>
            <View style={[s.swatch, { backgroundColor: sw.hex, borderColor: c.border }]} />
            <Text style={[s.swatchName, { color: c.text }]}>{sw.name}</Text>
            <Text style={[s.swatchHex, { color: c.textMuted }]}>{sw.hex.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 28 }} />
      <Text style={[s.sectionLabel, { color: c.textMuted }]}>TYPOGRAPHY</Text>
      <View style={{ height: 14 }} />

      <View style={[s.typeSample, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Text style={{ color: PALETTE.accent, fontSize: 36, fontWeight: "800", letterSpacing: 8 }}>
          SUDOKU
        </Text>
        <Text style={[s.typeCaption, { color: c.textMuted }]}>App name · 36 / 800 / spacing 8</Text>

        <View style={[s.typeDivider, { backgroundColor: c.border }]} />

        <Text style={{ color: c.text, fontSize: 40, fontWeight: "800" }}>1,240</Text>
        <Text style={[s.typeCaption, { color: c.textMuted }]}>Score · 40 / 800 / tabular nums</Text>

        <View style={[s.typeDivider, { backgroundColor: c.border }]} />

        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 2 }}>
          <Text style={{ color: PALETTE.accent, fontSize: 28, fontWeight: "800" }}>×</Text>
          <Text style={{ color: PALETTE.accent, fontSize: 52, fontWeight: "900", lineHeight: 58 }}>
            18
          </Text>
        </View>
        <Text style={[s.typeCaption, { color: c.textMuted }]}>
          Factor X · 52 / 900 / accent color
        </Text>

        <View style={[s.typeDivider, { backgroundColor: c.border }]} />

        <Text style={{ color: c.textMuted, fontSize: 20, fontWeight: "600", letterSpacing: 1 }}>
          05:32
        </Text>
        <Text style={[s.typeCaption, { color: c.textMuted }]}>Timer · 20 / 600 / muted</Text>
      </View>
    </View>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // Shell
  topBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // Color scheme picker
  pickerWrap: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  pickerRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 8,
  },
  schemePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  schemeDots: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  schemeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  schemeName: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Tabs
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabBtn: {
    flex: 1,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  // Common
  screen: {
    padding: H_PAD,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
  },

  // Home
  homeHero: {
    alignItems: "center",
    paddingTop: 28,
    gap: 6,
  },
  appName: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 10,
  },
  appTagline: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    gap: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  levelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  levelCardName: {
    fontSize: 17,
    fontWeight: "600",
  },
  levelCardSub: {
    fontSize: 13,
  },
  levelArrow: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  homeNav: {
    flexDirection: "row",
    gap: 8,
  },
  homeNavBtn: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  homeNavLabel: {
    fontSize: 13,
    fontWeight: "500",
  },

  // Game
  gameBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  levelPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "center",
  },
  levelPillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  levelPillText: {
    fontSize: 13,
    fontWeight: "700",
  },
  timerLabel: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 1,
    width: 50,
    textAlign: "right",
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 10,
  },
  scoreBlock: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  scoreCaption: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  scoreNum: {
    fontSize: 28,
    fontWeight: "800",
  },
  factorPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    gap: 1,
  },
  factorX: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 38,
  },
  factorNum: {
    fontSize: 38,
    fontWeight: "900",
  },
  dotRow: {
    flexDirection: "row",
    gap: 5,
    marginTop: 2,
  },
  errorDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  boardWrap: {
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: "hidden",
    alignSelf: "center",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
  clueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 2,
  },
  clueCaption: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  clueDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  numPad: {
    flexDirection: "row",
    justifyContent: "center",
  },
  padBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  padBtnNum: {
    fontSize: 20,
    fontWeight: "700",
  },

  // Stats
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    width: (SW - H_PAD * 2 - 10) / 2,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  statCardValue: {
    fontSize: 30,
    fontWeight: "800",
  },
  statCardLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  levelStatRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1,
  },
  levelStatBar: {
    width: 4,
    alignSelf: "stretch",
  },
  levelStatName: {
    fontSize: 16,
    fontWeight: "600",
  },
  levelStatMeta: {
    fontSize: 12,
  },
  streakBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 14,
  },

  // Tokens
  tokenSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
  swatchGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  swatchItem: {
    width: (SW - H_PAD * 2 - 12 * 2) / 3,
    alignItems: "center",
    gap: 4,
  },
  swatch: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchName: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  swatchHex: {
    fontSize: 9,
    textAlign: "center",
  },
  typeSample: {
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    gap: 2,
  },
  typeCaption: {
    fontSize: 11,
    marginTop: 2,
  },
  typeDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
    marginHorizontal: -20,
  },
});

export default DesignPreview;
