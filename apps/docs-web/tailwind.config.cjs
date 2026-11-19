const omn1 = require("@omn1/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [omn1],
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
    // Scan the component sources (Storybook aliases @omn1/ui-web to them for instant HMR).
    "../../packages/ui-web/src/**/*.{ts,tsx}",
  ],
};
