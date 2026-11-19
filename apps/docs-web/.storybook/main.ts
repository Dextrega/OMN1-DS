import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const here = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-themes"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  viteFinal: (cfg) =>
    mergeConfig(cfg, {
      resolve: {
        // Edit a component → Storybook updates, no rebuild of the package needed.
        alias: { "@omn1/ui-web": path.resolve(here, "../../../packages/ui-web/src/index.ts") },
      },
    }),
};
export default config;
