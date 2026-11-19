import { Icon, type IconName } from "@omn1/icons/native";
import { Pressable, View, type PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import { Spinner } from "../../lib/spinner";
import { buttonIconShape, BUTTON_ICON_PX } from "./styles";
import {
  buttonCtaContainer,
  buttonCtaLabel,
  buttonTone,
  type ButtonAppearance,
  type ButtonSize,
  type ButtonVariation,
} from "../button-cta/styles";

export * from "./styles";

/** Figma: ButtonIcon (2058:749). Verified at MD (48×48, 20px icon); other sizes provisional. */
export interface ButtonIconProps extends Omit<
  PressableProps,
  "children" | "className" | "disabled"
> {
  icon: IconName;
  /** Required: an icon-only control has no visible text. */
  accessibilityLabel: string;
  size?: ButtonSize;
  variation?: ButtonVariation;
  appearance?: ButtonAppearance;
  loading?: boolean;
  disabled?: boolean;
  /** Figma: DotStatus. */
  dot?: boolean;
  className?: string;
}

export function ButtonIcon({
  icon,
  size = "md",
  variation = "primary",
  appearance = "solid",
  loading = false,
  disabled = false,
  dot = false,
  className,
  onPress,
  ...rest
}: ButtonIconProps) {
  const iconColor =
    buttonCtaLabel({ size: "md", tone: buttonTone(variation, appearance, disabled) })
      .split(" ")
      .find((c) => c.startsWith("text-surface")) ?? "";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      className={cn(
        buttonCtaContainer({ size, variation, appearance, disabled }),
        buttonIconShape({ size }),
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size={BUTTON_ICON_PX[size]} className={iconColor} />
      ) : (
        <Icon name={icon} size={BUTTON_ICON_PX[size]} className={iconColor} />
      )}
      {dot && !loading && (
        <View className="absolute right-x1 bottom-x1 size-x1-5 rounded-full border border-surface-neutral-very-subtle bg-surface-danger-medium" />
      )}
    </Pressable>
  );
}
