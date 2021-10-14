module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.model.ts",
    "!src/**/index.ts",
    "!src/__dev-playground.ts",
    "!src/test/**/*.ts"
  ]
};
