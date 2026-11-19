import { themeKeys } from "@omn1/tokens";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Class merging aware of the OMN1 scales. tailwind-merge only knows Tailwind's defaults, so without this
 * `px-strong` would not replace `px-subtle`, and `text-body-md` (size) would clash with `text-surface-…` (colour).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [...themeKeys.spacing],
    },
    classGroups: {
      "font-size": [{ text: [...themeKeys.fontSize] }],
      rounded: [{ rounded: [...themeKeys.borderRadius] }],
      "border-w": [{ border: [...themeKeys.borderWidth] }],
      "ring-w": [{ ring: [...themeKeys.borderWidth] }],
      "outline-w": [{ outline: [...themeKeys.borderWidth] }],
      "font-weight": [{ font: [...themeKeys.fontWeight] }],
      tracking: [{ tracking: [...themeKeys.letterSpacing] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
