import { Icon, type IconName } from "@omn1/icons/native";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Animated,
  Easing,
  Pressable,
  Text,
  View,
  type PressableProps,
  type ViewProps,
} from "react-native";
import { cn } from "../../lib/cn";
import {
  TABS_ICON_PX,
  TABS_MOTION_MS,
  tabsBaseContainer,
  tabsBaseLabel,
  tabsIndicator,
  tabsList,
} from "./styles";

export * from "./styles";

/**
 * Figma: Tabs (235:1156) with its child `_TabsBase` (228:209) → `Tabs` / `TabsList` / `TabsBase` / `TabsPanel`.
 * Same props as @omn1/ui-web. The indicator scales in over 200ms. Panels are unmounted when inactive.
 *
 * PROVISIONAL: not verified against Figma (MCP access) — see docs/FIGMA-SYNC.md.
 */
interface TabsContext {
  value: string | undefined;
  select: (value: string) => void;
  orientation: "horizontal" | "vertical";
}
const Ctx = createContext<TabsContext | null>(null);
const useTabs = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Tabs components must be rendered inside <Tabs>");
  return ctx;
};

export interface TabsProps extends Omit<ViewProps, "className"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  ...rest
}: TabsProps) {
  const [inner, setInner] = useState(defaultValue);
  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
  };
  return (
    <Ctx.Provider value={{ value: value ?? inner, select, orientation }}>
      <View
        className={cn(orientation === "vertical" ? "flex-row gap-medium" : "flex-col", className)}
        {...rest}
      />
    </Ctx.Provider>
  );
}

export interface TabsListProps extends Omit<ViewProps, "className"> {
  className?: string;
}

export function TabsList({ className, ...rest }: TabsListProps) {
  const { orientation } = useTabs();
  return (
    <View accessibilityRole="tablist" className={cn(tabsList(orientation), className)} {...rest} />
  );
}

export interface TabsBaseProps extends Omit<
  PressableProps,
  "children" | "className" | "onPress" | "disabled"
> {
  value: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Figma: _TabsBase. */
export function TabsBase({
  value,
  leadingIcon,
  trailingIcon,
  disabled = false,
  className,
  children,
  ...rest
}: TabsBaseProps) {
  const ctx = useTabs();
  const selected = ctx.value === value;
  const label = tabsBaseLabel({ selected, disabled });
  const iconColor = label.split(" ").find((c) => c.startsWith("text-surface")) ?? "";
  const scale = useRef(new Animated.Value(selected ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(scale, {
      toValue: selected ? 1 : 0,
      duration: TABS_MOTION_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [selected, scale]);
  const scaleKey = ctx.orientation === "vertical" ? "scaleY" : "scaleX";
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={() => ctx.select(value)}
      className={cn(tabsBaseContainer({ orientation: ctx.orientation, disabled }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={TABS_ICON_PX} className={iconColor} />}
      {typeof children === "string" || typeof children === "number" ? (
        <Text className={label}>{children}</Text>
      ) : (
        children
      )}
      {trailingIcon && <Icon name={trailingIcon} size={TABS_ICON_PX} className={iconColor} />}
      <Animated.View
        pointerEvents="none"
        className={tabsIndicator(ctx.orientation)}
        style={{ transform: [{ [scaleKey]: scale }] }}
      />
    </Pressable>
  );
}

export interface TabsPanelProps extends Omit<ViewProps, "className"> {
  value: string;
  className?: string;
}

export function TabsPanel({ value, ...rest }: TabsPanelProps) {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return <View accessibilityRole="none" {...rest} />;
}
