import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-native",
    "nativewind",
    "react-native-svg",
    "lucide-react-native",
    "@omn1/icons",
    "@omn1/tokens",
  ],
});
