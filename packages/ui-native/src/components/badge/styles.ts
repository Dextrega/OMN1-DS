import { cva } from "class-variance-authority";

// Class names are spelled out in full on purpose: Tailwind only generates classes it can find as literal strings.
const tones = {
  neutral: {
    strong: ["bg-surface-neutral-strong", "text-surface-on-neutral-very-subtle"],
    subtle: ["bg-surface-neutral-very-subtle", "text-surface-on-neutral-very-strong"],
    outlined: ["border-stroke-neutral-medium", "text-surface-on-neutral-very-strong"],
  },
  primary: {
    strong: ["bg-surface-primary-strong", "text-surface-on-primary-very-subtle"],
    subtle: ["bg-surface-primary-very-subtle", "text-surface-on-primary-very-strong"],
    outlined: ["border-stroke-primary-medium", "text-surface-on-primary-very-strong"],
  },
  secondary: {
    strong: ["bg-surface-secondary-strong", "text-surface-on-secondary-very-subtle"],
    subtle: ["bg-surface-secondary-very-subtle", "text-surface-on-secondary-very-strong"],
    outlined: ["border-stroke-secondary-medium", "text-surface-on-secondary-very-strong"],
  },
  success: {
    strong: ["bg-surface-success-strong", "text-surface-on-success-very-subtle"],
    subtle: ["bg-surface-success-very-subtle", "text-surface-on-success-very-strong"],
    outlined: ["border-stroke-success-medium", "text-surface-on-success-very-strong"],
  },
  warning: {
    strong: ["bg-surface-warning-strong", "text-surface-on-warning-very-subtle"],
    subtle: ["bg-surface-warning-very-subtle", "text-surface-on-warning-very-strong"],
    outlined: ["border-stroke-warning-medium", "text-surface-on-warning-very-strong"],
  },
  danger: {
    strong: ["bg-surface-danger-strong", "text-surface-on-danger-very-subtle"],
    subtle: ["bg-surface-danger-very-subtle", "text-surface-on-danger-very-strong"],
    outlined: ["border-stroke-danger-medium", "text-surface-on-danger-very-strong"],
  },
  disabled: {
    strong: ["bg-alpha-neutral-subtle", "text-surface-on-neutral-subtle"],
    subtle: ["bg-alpha-neutral-very-subtle", "text-surface-on-neutral-subtle"],
    outlined: ["border-stroke-neutral-subtle", "text-surface-on-neutral-subtle"],
  },
} as const;

export type BadgeSize = "sm" | "md" | "lg";
export type BadgeVariant = keyof typeof tones;
export type BadgeAppearance = "subtle" | "strong" | "outlined";

export const badgeContainer = cva("flex-row items-center self-start", {
  variants: {
    size: {
      sm: "h-x2 gap-extra-subtle px-extra-subtle rounded-very-subtle",
      md: "h-x3 gap-extra-subtle px-very-subtle rounded-very-subtle",
      lg: "h-x4 gap-very-subtle px-subtle rounded-subtle",
    },
    outlined: { true: "border", false: "" },
  },
  defaultVariants: { size: "md", outlined: false },
});
export const labelSize = { sm: "text-overline", md: "text-caption", lg: "text-body-sm" } as const;
export const BADGE_ICON_PX = { sm: 10, md: 12, lg: 16 } as const;

/** [container colour class, text colour class] for a variant + appearance. */
export const badgeTone = (variant: BadgeVariant, appearance: BadgeAppearance) =>
  tones[variant][appearance];
