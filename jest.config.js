module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__test__/**/*.test.ts", "**/__test__/**/*.test.tsx"],
  moduleNameMapper: {
    "@/hooks/useStyles": "<rootDir>/__mocks__/useStyles.ts",
    "@/context/ColorModeContext": "<rootDir>/__mocks__/ColorModeContext.ts",
    "expo-audio": "<rootDir>/__mocks__/expo_audio.js",
    "^@/(.*)$": "<rootDir>/$1",
    "react-native-reanimated": "<rootDir>/__mocks__/react-native-reanimated.js",
  },
};
