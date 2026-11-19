import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: false, // dist/ also holds the files written by scripts/build.mjs
  sourcemap: true,
});
