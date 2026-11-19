import { Icon, type IconName } from "@omn1/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Badge (component set 6:9302) — Size SM/MD/LG × Variant × Appearance Subtle/Strong/Outlined.
 * Verified: MD Neutral Strong (24h, Spacement/VerySubtle × ExtraSubtle, Border Radius/VerySubtle, Barlow Medium 12/16).
 * Provisional: Subtle / Outlined colour pairings and the SM / LG metrics (heights 16 / 32 are from Figma).
 */
// Class names are spelled out in full on purpose: Tailwind only generates classes it can find as literal strings.
const tones = {
  neutral: {
    strong: "bg-surface-neutral-strong text-surface-on-neutral-very-subtle",
    subtle: "bg-surface-neutral-very-subtle text-surface-on-neutral-very-strong",
    outlined: "border-stroke-neutral-medium text-surface-on-neutral-very-strong",
  },
  primary: {
    strong: "bg-surface-primary-strong text-surface-on-primary-very-subtle",
    subtle: "bg-surface-primary-very-subtle text-surface-on-primary-very-strong",
    outlined: "border-stroke-primary-medium text-surface-on-primary-very-strong",
  },
  secondary: {
    strong: "bg-surface-secondary-strong text-surface-on-secondary-very-subtle",
    subtle: "bg-surface-secondary-very-subtle text-surface-on-secondary-very-strong",
    outlined: "border-stroke-secondary-medium text-surface-on-secondary-very-strong",
  },
  success: {
    strong: "bg-surface-success-strong text-surface-on-success-very-subtle",
    subtle: "bg-surface-success-very-subtle text-surface-on-success-very-strong",
    outlined: "border-stroke-success-medium text-surface-on-success-very-strong",
  },
  warning: {
    strong: "bg-surface-warning-strong text-surface-on-warning-very-subtle",
    subtle: "bg-surface-warning-very-subtle text-surface-on-warning-very-strong",
    outlined: "border-stroke-warning-medium text-surface-on-warning-very-strong",
  },
  danger: {
    strong: "bg-surface-danger-strong text-surface-on-danger-very-subtle",
    subtle: "bg-surface-danger-very-subtle text-surface-on-danger-very-strong",
    outlined: "border-stroke-danger-medium text-surface-on-danger-very-strong",
  },
} as const;

export const badgeVariants = cva(
  "inline-flex shrink-0 items-center font-sans font-medium whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "h-x2 gap-extra-subtle px-extra-subtle rounded-very-subtle text-overline",
        md: "h-x3 gap-extra-subtle px-very-subtle py-extra-subtle rounded-very-subtle text-caption",
        lg: "h-x4 gap-very-subtle px-subtle py-extra-subtle rounded-subtle text-body-sm",
      },
      variant: {
        neutral: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
        disabled: "",
      },
      appearance: { subtle: "", strong: "", outlined: "border border-very-subtle" },
    },
    compoundVariants: [
      ...(Object.keys(tones) as (keyof typeof tones)[]).flatMap((variant) =>
        (["strong", "subtle", "outlined"] as const).map((appearance) => ({
          variant,
          appearance,
          class: tones[variant][appearance],
        })),
      ),
      {
        variant: "disabled",
        appearance: "strong",
        class: "bg-alpha-neutral-subtle text-surface-on-neutral-subtle",
      },
      {
        variant: "disabled",
        appearance: "subtle",
        class: "bg-alpha-neutral-very-subtle text-surface-on-neutral-subtle",
      },
      {
        variant: "disabled",
        appearance: "outlined",
        class: "border-stroke-neutral-subtle text-surface-on-neutral-subtle",
      },
    ],
    defaultVariants: { size: "md", variant: "neutral", appearance: "strong" },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  /** Figma: leadingIcon. */
  leadingIcon?: IconName;
  children?: ReactNode;
}

const ICON_PX = { sm: 10, md: 12, lg: 16 } as const;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { size = "md", variant, appearance, leadingIcon, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ size, variant, appearance }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={ICON_PX[size ?? "md"]} />}
      {children}
    </span>
  );
});
