import { Icon } from "@omn1/icons/native";
import { useState, type ReactNode } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import { checkboxBox } from "./styles";

export * from "./styles";

/**
 * Figma: Checkbox (6:11899). All 21 variants verified (see @omn1/ui-web for the state mapping).
 * Pressed → `active:`. Controlled (`checked` + `onCheckedChange`) or uncontrolled (`defaultChecked`).
 */
export interface CheckboxProps extends Omit<
  PressableProps,
  "children" | "className" | "onPress" | "disabled"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate = false,
  invalid = false,
  required = false,
  disabled = false,
  label,
  description,
  className,
  ...rest
}: CheckboxProps) {
  const [inner, setInner] = useState(defaultChecked);
  const isChecked = checked ?? inner;
  const selected = isChecked || indeterminate;
  const toggle = () => {
    const next = indeterminate ? true : !isChecked;
    if (checked === undefined) setInner(next);
    onCheckedChange?.(next);
  };
  const glyphColor = disabled
    ? "text-surface-on-neutral-subtle"
    : invalid
      ? "text-surface-on-danger-very-subtle"
      : "text-surface-on-primary-very-subtle";

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? "mixed" : isChecked, disabled }}
      disabled={disabled}
      onPress={toggle}
      className={cn("flex-row items-start gap-very-subtle", className)}
      {...rest}
    >
      <View className={checkboxBox({ selected, invalid, required, disabled })}>
        {selected && (
          <Icon
            name={indeterminate ? "minus" : "check"}
            size={16}
            strokeWidth={2.5}
            className={glyphColor}
          />
        )}
      </View>
      {(label || description) && (
        <View className="shrink">
          {label && (
            <Text
              className={cn(
                "font-sans text-body-md",
                disabled ? "text-surface-on-neutral-subtle" : "text-alpha-inverse-strong",
              )}
            >
              {label}
              {required ? <Text className="text-surface-danger-medium"> *</Text> : null}
            </Text>
          )}
          {description && (
            <Text className="font-sans text-caption text-surface-on-neutral-medium">
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
