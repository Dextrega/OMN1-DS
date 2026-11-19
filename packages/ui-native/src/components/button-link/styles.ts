import { cva } from "class-variance-authority";

/** Class definitions are kept free of react-native imports so they can be unit-tested in plain Node. */

export const buttonLinkContainer = cva(
  "relative flex-row items-center justify-center gap-extra-subtle rounded-corner-very-subtle",
  {
    variants: { disabled: { true: "", false: "" } },
    defaultVariants: { disabled: false },
  },
);

export const buttonLinkLabel = cva("font-sans font-medium", {
  variants: {
    size: { sm: "text-body-sm", md: "text-body-md", lg: "text-body-lg" },
    // React Native does not inherit text colour, and `active:` only reaches the Pressable itself,
    // so the label colour is driven by an explicit `tone` (default / pressed / disabled per variation).
    tone: {
      neutral: "text-surface-on-neutral-very-strong",
      "neutral-pressed": "text-surface-on-neutral-medium",
      primary: "text-surface-primary-medium",
      "primary-pressed": "text-surface-primary-very-strong",
      danger: "text-surface-danger-medium",
      "danger-pressed": "text-surface-danger-very-strong",
      success: "text-surface-success-medium",
      "success-pressed": "text-surface-success-very-strong",
      inverse: "text-surface-neutral-very-subtle",
      "inverse-pressed": "text-surface-neutral-medium",
      disabled: "text-surface-on-neutral-subtle",
    },
  },
  defaultVariants: { size: "md", tone: "primary" },
});

export type ButtonLinkVariation = "neutral" | "primary" | "danger" | "success" | "inverse";
export const buttonLinkTone = (
  variation: ButtonLinkVariation,
  pressed: boolean,
  disabled: boolean,
) =>
  (disabled ? "disabled" : pressed ? `${variation}-pressed` : variation) as
    ButtonLinkVariation | `${ButtonLinkVariation}-pressed` | "disabled";

export const BUTTON_LINK_ICON_PX = { sm: 16, md: 20, lg: 24 } as const;
