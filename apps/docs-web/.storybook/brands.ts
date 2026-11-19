import type { Brand } from "@omn1/ui-web";

/**
 * Demo client brand used by the Storybook "Brand" toolbar to prove the theming contract:
 * colours (Key layer) + typography + icon weight + assets change; components do not.
 */
export const acmeBrand: Brand = {
  colors: {
    primary: {
      "extra-subtle": "#fff1f2",
      "very-subtle": "#ffe4e6",
      subtle: "#fda4af",
      medium: "#e11d48",
      strong: "#be123c",
      "very-strong": "#881337",
      "extra-strong": "#4c0519",
    },
  },
  fonts: { sans: '"Georgia", serif' },
  iconStrokeWidth: 1.5,
  assets: {
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='32'%3E%3Crect width='96' height='32' rx='8' fill='%23e11d48'/%3E%3Ctext x='48' y='21' font-size='14' text-anchor='middle' fill='white' font-family='Georgia'%3EACME%3C/text%3E%3C/svg%3E",
  },
};

export const brands: Record<string, Brand | undefined> = { omn1: undefined, acme: acmeBrand };
