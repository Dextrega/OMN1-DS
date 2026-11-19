import { cn } from "../../lib/cn";

export const checkboxBox = ({
  selected,
  invalid,
  required,
  disabled,
}: {
  selected: boolean;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}) =>
  cn(
    "size-x2-5 items-center justify-center rounded-extra-subtle border",
    disabled
      ? cn(
          "border-stroke-neutral-subtle",
          selected ? "bg-surface-neutral-subtle" : "bg-surface-neutral-very-subtle",
        )
      : invalid
        ? cn(
            "border-stroke-danger-medium",
            selected ? "bg-surface-danger-medium" : "bg-surface-danger-very-subtle",
          )
        : selected
          ? "border-stroke-neutral-subtle bg-surface-primary-medium active:bg-surface-primary-strong"
          : cn(
              required ? "border-stroke-danger-medium" : "border-alpha-inverse-subtle",
              "bg-surface-neutral-very-subtle active:bg-alpha-inverse-very-subtle active:border-medium",
            ),
  );
