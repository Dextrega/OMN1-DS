import { Icon, type IconName } from "@omn1/icons/native";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import { Spinner } from "../../lib/spinner";
import { buttonCtaContainer, buttonCtaLabel, buttonTone } from "./styles";

export * from "./styles";

/**
 * Figma: ButtonCTA (6:9388). Same tokens and classes as @omn1/ui-web — see its notes on what is verified
 * vs provisional. On native, Pressed → `active:`; there is no hover/focus ring.
 * React Native does not inherit text colour, so colour classes live in two maps: container and label.
 */
export interface ButtonCTAProps
  extends
    Omit<PressableProps, "children" | "className" | "disabled">,
    Omit<NonNullable<VariantProps<typeof buttonCtaContainer>>, "disabled"> {
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ButtonCTA({
  size = "md",
  variation = "primary",
  appearance = "solid",
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled = false,
  className,
  children,
  onPress,
  ...rest
}: ButtonCTAProps) {
  const tone = buttonTone(variation!, appearance!, disabled);
  const label = buttonCtaLabel({ size, tone });
  const iconColor = label.split(" ").find((c) => c.startsWith("text-surface")) ?? "";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      className={cn(buttonCtaContainer({ size, variation, appearance, disabled }), className)}
      {...rest}
    >
      <View
        className={cn(
          "flex-row items-center justify-center gap-very-subtle",
          loading && "opacity-0",
        )}
      >
        {leadingIcon && <Icon name={leadingIcon} size={20} className={iconColor} />}
        {typeof children === "string" || typeof children === "number" ? (
          <Text className={label}>{children}</Text>
        ) : (
          children
        )}
        {trailingIcon && <Icon name={trailingIcon} size={20} className={iconColor} />}
      </View>
      {loading && (
        <View className="absolute">
          <Spinner size={20} className={iconColor} />
        </View>
      )}
    </Pressable>
  );
}
