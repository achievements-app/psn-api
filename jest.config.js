module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.model.ts",
    "!src/**/index.ts",
    "!src/test/**/*.ts",
    "!src/__playground.ts"
  ]
};
