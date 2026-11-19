import { Icon, type IconName } from "@omn1/icons";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Chips (6:12377) — Size SM (24h) / MD (36h) × Appearance Filled / Outlined × State × Selection Off / On.
 * A chip is a toggle button (`aria-pressed`): Selection → `selected`, Hovered → hover, Pressed → active,
 * Actived → focus-visible, Disabled → `disabled`.
 *
 * PROVISIONAL: the Figma file could not be read when this was written (MCP access). The variant matrix and the heights are
 * from Figma; colours, radius and paddings are assumptions. (ChipsSelect, a separate Figma component, is not implemented.)
 * See docs/FIGMA-SYNC.md.
 */
export const chipVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-extra-subtle rounded-full font-sans font-medium whitespace-nowrap",
    "transition-colors duration-150 motion-reduce:transition-none",
    "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-stroke-secondary-medium",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-x3 px-very-subtle text-caption",
        md: "h-x4-5 px-subtle text-body-sm",
      },
      appearance: {
        filled: [
          "bg-surface-neutral-subtle text-surface-on-neutral-very-strong hover:bg-surface-neutral-medium active:bg-surface-neutral-strong",
          "aria-pressed:bg-surface-primary-medium aria-pressed:text-surface-on-primary-very-subtle aria-pressed:hover:bg-surface-primary-strong aria-pressed:active:bg-surface-primary-very-strong",
          "disabled:bg-alpha-inverse-very-subtle disabled:text-surface-on-neutral-subtle disabled:aria-pressed:bg-alpha-inverse-subtle disabled:aria-pressed:text-surface-on-neutral-subtle",
        ],
        outlined: [
          "border border-very-subtle border-stroke-neutral-medium text-surface-on-neutral-very-strong hover:bg-alpha-neutral-very-subtle active:bg-alpha-neutral-subtle",
          "aria-pressed:border-stroke-primary-medium aria-pressed:bg-alpha-primary-very-subtle aria-pressed:text-surface-primary-medium aria-pressed:hover:bg-alpha-primary-subtle aria-pressed:active:bg-alpha-primary-subtle",
          "disabled:border-stroke-neutral-subtle disabled:bg-transparent disabled:text-surface-on-neutral-subtle disabled:aria-pressed:border-stroke-neutral-subtle disabled:aria-pressed:bg-alpha-inverse-very-subtle disabled:aria-pressed:text-surface-on-neutral-subtle",
        ],
      },
    },
    defaultVariants: { size: "md", appearance: "filled" },
  },
);

export type ChipVariantProps = VariantProps<typeof chipVariants>;

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">, ChipVariantProps {
  /** Figma: Selection=On. */
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  leadingIcon?: IconName;
  children?: ReactNode;
}

const ICON_PX = { sm: 12, md: 16 } as const;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    size = "md",
    appearance,
    selected,
    defaultSelected = false,
    onSelectedChange,
    leadingIcon,
    className,
    children,
    onClick,
    type = "button",
    ...rest
  },
  ref,
) {
  const [inner, setInner] = useState(defaultSelected);
  const isOn = selected ?? inner;
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (selected === undefined) setInner(!isOn);
    onSelectedChange?.(!isOn);
  };
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={isOn}
      onClick={handleClick}
      className={cn(chipVariants({ size, appearance }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={ICON_PX[size ?? "md"]} />}
      {children}
    </button>
  );
});
