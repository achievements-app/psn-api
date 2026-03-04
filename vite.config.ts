import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`
    },
    sourcemap: true
  },
  plugins: [dts({ rollupTypes: true, tsconfigPath: "./tsconfig.build.json" })],
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.model.ts",
        "src/**/index.ts",
        "src/test/**/*.ts",
        "src/__playground.ts"
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    }
  }
});
