import { Icon, type IconName } from "@omn1/icons/native";
import { useState, type ReactNode } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import { Spinner } from "../../lib/spinner";
import {
  BUTTON_LINK_ICON_PX,
  buttonLinkContainer,
  buttonLinkLabel,
  buttonLinkTone,
  type ButtonLinkVariation,
} from "./styles";

export * from "./styles";

/**
 * Figma: ButtonLink (6:11853). Same props as @omn1/ui-web (`href` is web-only; use `onPress` for navigation).
 * Pressed is tracked in state because `active:` cannot recolour the child `Text`; there is no hover / underline on touch
 * (the web underline-on-hover has no native counterpart).
 *
 * PROVISIONAL: not verified against Figma (MCP access). See docs/FIGMA-SYNC.md.
 */
export interface ButtonLinkProps extends Omit<
  PressableProps,
  "children" | "className" | "disabled"
> {
  size?: "sm" | "md" | "lg";
  variation?: ButtonLinkVariation;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ButtonLink({
  size = "md",
  variation = "primary",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled = false,
  className,
  children,
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: ButtonLinkProps) {
  const [pressed, setPressed] = useState(false);
  const tone = buttonLinkTone(variation, pressed, disabled);
  const label = buttonLinkLabel({ size, tone });
  const iconColor = label.split(" ").find((c) => c.startsWith("text-surface")) ?? "";
  const px = BUTTON_LINK_ICON_PX[size];
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      onPressIn={(e) => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
      className={cn(buttonLinkContainer({ disabled }), className)}
      {...rest}
    >
      <View
        className={cn(
          "flex-row items-center justify-center gap-extra-subtle",
          loading && "opacity-0",
        )}
      >
        {leadingIcon && <Icon name={leadingIcon} size={px} className={iconColor} />}
        {typeof children === "string" || typeof children === "number" ? (
          <Text className={label}>{children}</Text>
        ) : (
          children
        )}
        {trailingIcon && <Icon name={trailingIcon} size={px} className={iconColor} />}
      </View>
      {loading && (
        <View className="absolute">
          <Spinner size={px} className={iconColor} />
        </View>
      )}
    </Pressable>
  );
}
