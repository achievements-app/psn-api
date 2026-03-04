import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: ["dist", "coverage", "website"],
  rules: {
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/filename-case": "off",
    "typescript/no-explicit-any": "off"
  }
});
