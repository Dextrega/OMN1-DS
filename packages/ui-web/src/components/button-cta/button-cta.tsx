import { Icon, type IconName } from "@omn1/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: ButtonCTA (component set 6:9388) — Size × Variation × Appearance × State.
 * Interactive states are CSS, not props:  Hovered → hover:  Pressed → active:  Focused → focus-visible:
 *                                          Actived → aria-pressed="true"  Disabled → disabled  Loading → `loading`
 *
 * Verified against Figma: all Solid sizes, geometry and Enabled / Hovered fills, Disabled.
 * Provisional (not yet extracted — see docs/FIGMA-SYNC.md): Outlined + Ghost colours, Pressed fills.
 */
export const buttonCtaVariants = cva(
  [
    "relative inline-flex shrink-0 select-none items-center justify-center gap-very-subtle",
    "font-sans font-medium whitespace-nowrap",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-stroke-secondary-medium",
    "aria-pressed:ring-very-subtle aria-pressed:ring-stroke-neutral-strong",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        xs: "min-h-x3 min-w-x3 px-very-subtle rounded-corner-very-subtle text-caption",
        sm: "min-h-x4 min-w-x4 px-very-subtle rounded-corner-very-subtle text-body-sm",
        md: "min-h-x6 min-w-x6 px-subtle rounded-subtle text-body-md",
        lg: "min-h-x8 min-w-x8 px-medium rounded-corner-subtle text-body-lg",
      },
      variation: { neutral: "", primary: "", success: "", danger: "", inverse: "" },
      appearance: { solid: "", outlined: "border border-very-subtle", ghost: "" },
    },
    compoundVariants: [
      // ---- solid (verified) --------------------------------------------------------------
      {
        appearance: "solid",
        variation: "neutral",
        class:
          "bg-surface-neutral-very-strong text-surface-on-neutral-very-subtle hover:bg-surface-neutral-strong active:bg-surface-neutral-medium",
      },
      {
        appearance: "solid",
        variation: "inverse",
        class:
          "bg-surface-neutral-very-subtle text-surface-on-neutral-very-strong hover:bg-surface-neutral-subtle active:bg-surface-neutral-medium",
      },
      {
        appearance: "solid",
        variation: "primary",
        class:
          "bg-surface-primary-medium text-surface-on-primary-very-subtle hover:bg-surface-primary-strong active:bg-surface-primary-very-strong",
      },
      {
        appearance: "solid",
        variation: "danger",
        class:
          "bg-surface-danger-medium text-surface-on-danger-very-subtle hover:bg-surface-danger-strong active:bg-surface-danger-very-strong",
      },
      {
        appearance: "solid",
        variation: "success",
        class:
          "bg-surface-success-medium text-surface-on-success-very-subtle hover:bg-surface-success-strong active:bg-surface-success-very-strong",
      },
      {
        appearance: "solid",
        class: "disabled:bg-alpha-neutral-very-subtle disabled:text-surface-on-neutral-subtle",
      },
      // ---- outlined (provisional) ----------------------------------------------------------
      {
        appearance: "outlined",
        variation: "neutral",
        class:
          "border-stroke-neutral-medium text-surface-on-neutral-very-strong hover:bg-alpha-neutral-very-subtle active:bg-alpha-neutral-subtle",
      },
      {
        appearance: "outlined",
        variation: "inverse",
        class:
          "border-stroke-neutral-subtle text-surface-neutral-very-subtle hover:bg-alpha-inverse-very-subtle active:bg-alpha-inverse-subtle",
      },
      {
        appearance: "outlined",
        variation: "primary",
        class:
          "border-stroke-primary-medium text-surface-primary-medium hover:bg-alpha-primary-very-subtle active:bg-alpha-primary-subtle",
      },
      {
        appearance: "outlined",
        variation: "danger",
        class:
          "border-stroke-danger-medium text-surface-danger-medium hover:bg-alpha-danger-very-subtle active:bg-alpha-danger-subtle",
      },
      {
        appearance: "outlined",
        variation: "success",
        class:
          "border-stroke-success-medium text-surface-success-medium hover:bg-alpha-success-very-subtle active:bg-alpha-success-subtle",
      },
      {
        appearance: "outlined",
        class:
          "disabled:border-stroke-neutral-subtle disabled:text-surface-on-neutral-subtle disabled:bg-transparent",
      },
      // ---- ghost (provisional) ----------------------------------------------------------------
      {
        appearance: "ghost",
        variation: "neutral",
        class:
          "text-surface-on-neutral-very-strong hover:bg-alpha-neutral-very-subtle active:bg-alpha-neutral-subtle",
      },
      {
        appearance: "ghost",
        variation: "inverse",
        class:
          "text-surface-neutral-very-subtle hover:bg-alpha-inverse-very-subtle active:bg-alpha-inverse-subtle",
      },
      {
        appearance: "ghost",
        variation: "primary",
        class:
          "text-surface-primary-medium hover:bg-alpha-primary-very-subtle active:bg-alpha-primary-subtle",
      },
      {
        appearance: "ghost",
        variation: "danger",
        class:
          "text-surface-danger-medium hover:bg-alpha-danger-very-subtle active:bg-alpha-danger-subtle",
      },
      {
        appearance: "ghost",
        variation: "success",
        class:
          "text-surface-success-medium hover:bg-alpha-success-very-subtle active:bg-alpha-success-subtle",
      },
      {
        appearance: "ghost",
        class: "disabled:text-surface-on-neutral-subtle disabled:bg-transparent",
      },
    ],
    defaultVariants: { size: "md", variation: "primary", appearance: "solid" },
  },
);

export type ButtonCTAVariantProps = VariantProps<typeof buttonCtaVariants>;

export interface ButtonCTAProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">, ButtonCTAVariantProps {
  /** Figma: LeadingIcon (boolean + swap). */
  leadingIcon?: IconName;
  /** Figma: TrailingIcon (boolean + swap). */
  trailingIcon?: IconName;
  /** Figma: State=Loading. The button keeps its size, shows a spinner and ignores clicks. */
  loading?: boolean;
  /** Figma: Text (string). */
  children?: ReactNode;
}

export const ButtonCTA = forwardRef<HTMLButtonElement, ButtonCTAProps>(function ButtonCTA(
  {
    size,
    variation,
    appearance,
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    className,
    children,
    type = "button",
    onClick,
    ...rest
  },
  ref,
) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) return e.preventDefault();
    onClick?.(e);
  };
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      data-loading={loading || undefined}
      onClick={handleClick}
      className={cn(
        buttonCtaVariants({ size, variation, appearance }),
        loading && "cursor-progress",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-very-subtle",
          loading && "invisible",
        )}
      >
        {leadingIcon && <Icon name={leadingIcon} size={20} />}
        {children}
        {trailingIcon && <Icon name={trailingIcon} size={20} />}
      </span>
      {loading && (
        <Icon name="loader" size={20} className="absolute animate-spin" aria-label="Loading" />
      )}
    </button>
  );
});
