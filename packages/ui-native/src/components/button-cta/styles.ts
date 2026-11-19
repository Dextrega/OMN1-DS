import { cva, type VariantProps } from "class-variance-authority";

/** Class definitions are kept free of react-native imports so they can be unit-tested in plain Node. */

export const buttonCtaContainer = cva(
  "relative flex-row items-center justify-center gap-very-subtle",
  {
    variants: {
      size: {
        xs: "min-h-x3 min-w-x3 px-very-subtle rounded-corner-very-subtle",
        sm: "min-h-x4 min-w-x4 px-very-subtle rounded-corner-very-subtle",
        md: "min-h-x6 min-w-x6 px-subtle rounded-subtle",
        lg: "min-h-x8 min-w-x8 px-medium rounded-corner-subtle",
      },
      variation: { neutral: "", primary: "", success: "", danger: "", inverse: "" },
      appearance: { solid: "", outlined: "border", ghost: "" },
      disabled: { true: "", false: "" },
    },
    compoundVariants: [
      {
        appearance: "solid",
        variation: "neutral",
        disabled: false,
        class: "bg-surface-neutral-very-strong active:bg-surface-neutral-medium",
      },
      {
        appearance: "solid",
        variation: "inverse",
        disabled: false,
        class: "bg-surface-neutral-very-subtle active:bg-surface-neutral-medium",
      },
      {
        appearance: "solid",
        variation: "primary",
        disabled: false,
        class: "bg-surface-primary-medium active:bg-surface-primary-very-strong",
      },
      {
        appearance: "solid",
        variation: "danger",
        disabled: false,
        class: "bg-surface-danger-medium active:bg-surface-danger-very-strong",
      },
      {
        appearance: "solid",
        variation: "success",
        disabled: false,
        class: "bg-surface-success-medium active:bg-surface-success-very-strong",
      },
      { appearance: "solid", disabled: true, class: "bg-alpha-neutral-very-subtle" },

      {
        appearance: "outlined",
        variation: "neutral",
        disabled: false,
        class: "border-stroke-neutral-medium active:bg-alpha-neutral-subtle",
      },
      {
        appearance: "outlined",
        variation: "inverse",
        disabled: false,
        class: "border-stroke-neutral-subtle active:bg-alpha-inverse-subtle",
      },
      {
        appearance: "outlined",
        variation: "primary",
        disabled: false,
        class: "border-stroke-primary-medium active:bg-alpha-primary-subtle",
      },
      {
        appearance: "outlined",
        variation: "danger",
        disabled: false,
        class: "border-stroke-danger-medium active:bg-alpha-danger-subtle",
      },
      {
        appearance: "outlined",
        variation: "success",
        disabled: false,
        class: "border-stroke-success-medium active:bg-alpha-success-subtle",
      },
      { appearance: "outlined", disabled: true, class: "border-stroke-neutral-subtle" },

      {
        appearance: "ghost",
        variation: "neutral",
        disabled: false,
        class: "active:bg-alpha-neutral-subtle",
      },
      {
        appearance: "ghost",
        variation: "inverse",
        disabled: false,
        class: "active:bg-alpha-inverse-subtle",
      },
      {
        appearance: "ghost",
        variation: "primary",
        disabled: false,
        class: "active:bg-alpha-primary-subtle",
      },
      {
        appearance: "ghost",
        variation: "danger",
        disabled: false,
        class: "active:bg-alpha-danger-subtle",
      },
      {
        appearance: "ghost",
        variation: "success",
        disabled: false,
        class: "active:bg-alpha-success-subtle",
      },
    ],
    defaultVariants: { size: "md", variation: "primary", appearance: "solid", disabled: false },
  },
);

const labelSize = {
  xs: "text-caption",
  sm: "text-body-sm",
  md: "text-body-md",
  lg: "text-body-lg",
} as const;

export const buttonCtaLabel = cva("font-sans", {
  variants: {
    size: labelSize,
    tone: {
      "solid-neutral": "text-surface-on-neutral-very-subtle",
      "solid-inverse": "text-surface-on-neutral-very-strong",
      "solid-primary": "text-surface-on-primary-very-subtle",
      "solid-danger": "text-surface-on-danger-very-subtle",
      "solid-success": "text-surface-on-success-very-subtle",
      "line-neutral": "text-surface-on-neutral-very-strong",
      "line-inverse": "text-surface-neutral-very-subtle",
      "line-primary": "text-surface-primary-medium",
      "line-danger": "text-surface-danger-medium",
      "line-success": "text-surface-success-medium",
      disabled: "text-surface-on-neutral-subtle",
    },
  },
  defaultVariants: { size: "md" },
});

export type ButtonVariation = "neutral" | "primary" | "success" | "danger" | "inverse";
export type ButtonAppearance = "solid" | "outlined" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

/** Text/icon colour class for a button (shared with ButtonIcon). */
export function buttonTone(
  variation: ButtonVariation,
  appearance: ButtonAppearance,
  disabled: boolean,
) {
  if (disabled) return "disabled" as const;
  return `${appearance === "solid" ? "solid" : "line"}-${variation}` as const;
}
