import { Icon, type IconName } from "@omn1/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "../../lib/cn";
import { buttonCtaVariants } from "../button-cta/button-cta";

/**
 * Figma: ButtonIcon (component set 2058:749) — same Size × Variation × Appearance × State matrix as ButtonCTA.
 * Colours/states are shared with ButtonCTA; only the geometry differs (square, icon only).
 * Verified: MD (48×48, 20px icon, padding Spacement/VerySubtle, radius Border Radius/Subtle).
 * Provisional: XS/SM/LG icon sizes and the status-dot offsets.
 */
const shape = cva("p-very-subtle", {
  variants: {
    size: {
      xs: "size-x3 min-h-0 min-w-0 p-x0-5",
      sm: "size-x4 min-h-0 min-w-0",
      md: "size-x6 min-h-0 min-w-0",
      lg: "size-x8 min-h-0 min-w-0",
    },
  },
  defaultVariants: { size: "md" },
});
const ICON_PX = { xs: 16, sm: 16, md: 20, lg: 24 } as const;

export type ButtonIconVariantProps = VariantProps<typeof buttonCtaVariants>;

export interface ButtonIconProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label">,
    ButtonIconVariantProps {
  icon: IconName;
  /** Required: an icon-only control has no visible text. */
  "aria-label": string;
  loading?: boolean;
  /** Figma: DotStatus — a notification dot on the corner. */
  dot?: boolean;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(function ButtonIcon(
  {
    size = "md",
    variation,
    appearance,
    icon,
    loading = false,
    dot = false,
    disabled,
    className,
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
  const px = ICON_PX[size ?? "md"];
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
        shape({ size }),
        loading && "cursor-progress",
        className,
      )}
      {...rest}
    >
      <Icon name={loading ? "loader" : icon} size={px} className={cn(loading && "animate-spin")} />
      {dot && !loading && (
        <span
          aria-hidden="true"
          data-slot="dot"
          className="absolute right-x1 bottom-x1 size-x1-5 rounded-full border border-very-subtle border-surface-neutral-very-subtle bg-surface-danger-medium"
        />
      )}
    </button>
  );
});
