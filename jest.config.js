module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__test__/**/*.test.ts", "**/__test__/**/*.test.tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
