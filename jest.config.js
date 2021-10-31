module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|.next|cypress)[/\\\\]"
  ],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],

  projects: [
    {
      displayName: {
        name: "UNIT",
        color: "blue"
      },
      testMatch: ["<rootDir>/src/**/*.test.ts"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
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
      ]
    },
    {
      displayName: {
        name: "E2E",
        color: "magenta"
      },
      testMatch: ["<rootDir>/e2e/**/*.e2e.spec.ts"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      }
    }
  ]
};
