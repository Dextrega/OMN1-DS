import type { Config } from "tailwindcss";

declare const preset: Partial<Config>;
export = preset;
declare namespace preset {
  /** Glob(s) for Tailwind `content` so classes used inside an OMN1 UI package are generated. */
  function content(pkg: "ui-web" | "ui-native" | (string & {})): string[];
}
