import { cn } from "../../lib/cn";

export type ChipSize = "sm" | "md";
export type ChipAppearance = "filled" | "outlined";

export const CHIP_ICON_PX = { sm: 12, md: 16 } as const;

export const chipContainer = ({
  size,
  appearance,
  selected,
  disabled,
}: {
  size: ChipSize;
  appearance: ChipAppearance;
  selected: boolean;
  disabled: boolean;
}) =>
  cn(
    "flex-row items-center justify-center gap-extra-subtle rounded-full",
    size === "sm" ? "h-x3 px-very-subtle" : "h-x4-5 px-subtle",
    appearance === "filled"
      ? disabled
        ? selected
          ? "bg-alpha-inverse-subtle"
          : "bg-alpha-inverse-very-subtle"
        : selected
          ? "bg-surface-primary-medium active:bg-surface-primary-very-strong"
          : "bg-surface-neutral-subtle active:bg-surface-neutral-strong"
      : cn(
          "border",
          disabled
            ? cn("border-stroke-neutral-subtle", selected && "bg-alpha-inverse-very-subtle")
            : selected
              ? "border-stroke-primary-medium bg-alpha-primary-very-subtle active:bg-alpha-primary-subtle"
              : "border-stroke-neutral-medium active:bg-alpha-neutral-subtle",
        ),
  );

export const chipLabel = ({
  size,
  appearance,
  selected,
  disabled,
}: {
  size: ChipSize;
  appearance: ChipAppearance;
  selected: boolean;
  disabled: boolean;
}) =>
  cn(
    "font-sans font-medium",
    size === "sm" ? "text-caption" : "text-body-sm",
    disabled
      ? "text-surface-on-neutral-subtle"
      : selected
        ? appearance === "filled"
          ? "text-surface-on-primary-very-subtle"
          : "text-surface-primary-medium"
        : "text-surface-on-neutral-very-strong",
  );
