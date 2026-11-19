import { cn } from "../../lib/cn";

export const TABS_MOTION_MS = 200;
export const TABS_ICON_PX = 20;

export const tabsList = (orientation: "horizontal" | "vertical") =>
  orientation === "vertical"
    ? "flex-col border-l border-stroke-neutral-subtle"
    : "flex-row border-b border-stroke-neutral-subtle";

export const tabsBaseContainer = ({
  orientation,
  disabled,
}: {
  orientation: "horizontal" | "vertical";
  disabled: boolean;
}) =>
  cn(
    "relative flex-row items-center gap-extra-subtle px-subtle py-very-subtle",
    orientation === "vertical" ? "justify-start" : "justify-center",
    !disabled && "active:bg-alpha-neutral-subtle",
  );

export const tabsBaseLabel = ({ selected, disabled }: { selected: boolean; disabled: boolean }) =>
  cn(
    "font-sans font-medium text-body-md",
    disabled
      ? "text-surface-on-neutral-subtle"
      : selected
        ? "text-surface-primary-medium"
        : "text-surface-on-neutral-medium",
  );

export const tabsIndicator = (orientation: "horizontal" | "vertical") =>
  cn(
    "absolute bg-surface-primary-medium",
    orientation === "vertical" ? "inset-y-0 left-0 w-x0-5" : "inset-x-0 bottom-0 h-x0-5",
  );
