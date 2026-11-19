import { cn } from "../../lib/cn";

export const textInputField = ({
  focused,
  invalid,
  disabled,
}: {
  focused: boolean;
  invalid: boolean;
  disabled: boolean;
}) =>
  cn(
    "min-h-x6 flex-row items-center gap-very-subtle rounded-very-subtle border px-subtle",
    disabled
      ? "border-transparent bg-alpha-neutral-very-subtle"
      : cn(
          "bg-alpha-inverse-very-subtle",
          invalid
            ? "border-stroke-danger-medium"
            : focused
              ? "border-stroke-neutral-strong"
              : "border-transparent",
        ),
  );
