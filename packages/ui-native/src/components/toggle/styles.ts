import { cn } from "../../lib/cn";

/** Track 56×28 (`w-x7 h-x3-5`), 4px inset, 20px thumb that travels 28px. */
export const TOGGLE_TRAVEL_PX = 28;
export const TOGGLE_MOTION_MS = 200;

export const toggleTrack = ({
  on,
  invalid,
  required,
  disabled,
}: {
  on: boolean;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}) =>
  cn(
    "h-x3-5 w-x7 justify-center rounded-full px-x0-5",
    disabled
      ? on
        ? "bg-alpha-inverse-subtle"
        : "bg-alpha-inverse-very-subtle"
      : invalid
        ? cn(
            "border border-stroke-danger-medium",
            on ? "bg-surface-danger-medium" : "bg-surface-neutral-subtle",
          )
        : on
          ? "bg-surface-primary-medium active:bg-surface-primary-very-strong"
          : cn(
              required && "border border-stroke-danger-medium",
              "bg-surface-neutral-subtle active:bg-surface-neutral-strong",
            ),
  );

export const toggleThumb = ({ on, disabled }: { on: boolean; disabled: boolean }) =>
  cn(
    "size-x2-5 rounded-full",
    disabled
      ? "bg-surface-neutral-very-subtle"
      : on
        ? "bg-surface-on-primary-very-subtle"
        : "bg-surface-neutral-very-subtle",
  );
