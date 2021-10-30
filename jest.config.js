module.exports = {
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.model.ts",
    "!src/**/index.ts",
    "!src/test/**/*.ts",
    "!src/__playground.ts"
  ],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1"
  }
};
