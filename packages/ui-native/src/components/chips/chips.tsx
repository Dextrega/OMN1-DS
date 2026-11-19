import { Icon, type IconName } from "@omn1/icons/native";
import { useState, type ReactNode } from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import {
  CHIP_ICON_PX,
  chipContainer,
  chipLabel,
  type ChipAppearance,
  type ChipSize,
} from "./styles";

export * from "./styles";

/**
 * Figma: Chips (6:12377) — Size SM / MD × Appearance Filled / Outlined × Selection Off / On. Same props as @omn1/ui-web.
 * Selection is exposed as `accessibilityState.selected`. Pressed → `active:`.
 *
 * PROVISIONAL: not verified against Figma (MCP access). See docs/FIGMA-SYNC.md.
 */
export interface ChipProps extends Omit<
  PressableProps,
  "children" | "className" | "onPress" | "disabled"
> {
  size?: ChipSize;
  appearance?: ChipAppearance;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  leadingIcon?: IconName;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Chip({
  size = "md",
  appearance = "filled",
  selected,
  defaultSelected = false,
  onSelectedChange,
  leadingIcon,
  disabled = false,
  className,
  children,
  ...rest
}: ChipProps) {
  const [inner, setInner] = useState(defaultSelected);
  const isOn = selected ?? inner;
  const label = chipLabel({ size, appearance, selected: isOn, disabled });
  const iconColor = label.split(" ").find((c) => c.startsWith("text-surface")) ?? "";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isOn, disabled }}
      disabled={disabled}
      onPress={() => {
        if (selected === undefined) setInner(!isOn);
        onSelectedChange?.(!isOn);
      }}
      className={cn(chipContainer({ size, appearance, selected: isOn, disabled }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={CHIP_ICON_PX[size]} className={iconColor} />}
      {typeof children === "string" || typeof children === "number" ? (
        <Text className={label}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
