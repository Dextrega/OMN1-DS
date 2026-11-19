import { Icon, type IconName } from "@omn1/icons/native";
import { useState, type ReactNode } from "react";
import {
  Text,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import { cn } from "../../lib/cn";
import { Spinner } from "../../lib/spinner";
import { textInputField } from "./styles";

export * from "./styles";

/**
 * Figma: TextInput (6:9944) — Full (88h) / Compact (48h). Same tokens as @omn1/ui-web; Active → focused (state),
 * Hovered does not exist on touch. Provisional: stroke colours per state, Compact layout.
 */
export interface TextInputProps extends Omit<
  RNTextInputProps,
  "className" | "editable" | "placeholderTextColor"
> {
  appearance?: "full" | "compact";
  label?: string;
  hint?: string;
  helper?: string;
  error?: string;
  counter?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Class for the outer wrapper. */
  className?: string;
}

export function TextInput({
  appearance = "full",
  label,
  hint,
  helper,
  error,
  counter,
  prefix,
  suffix,
  leadingIcon,
  trailingIcon,
  loading = false,
  required = false,
  disabled = false,
  className,
  maxLength,
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  accessibilityLabel,
  ...rest
}: TextInputProps) {
  const [focused, setFocused] = useState(false);
  const [length, setLength] = useState(String(value ?? defaultValue ?? "").length);
  const invalid = Boolean(error);
  const message = error ?? helper;
  const full = appearance === "full";
  const currentLength = value !== undefined ? value.length : length;
  const iconTone = disabled ? "text-surface-on-neutral-subtle" : "text-alpha-inverse-strong";

  return (
    <View className={cn("w-full gap-very-subtle", className)}>
      {full && (label || hint) && (
        <View className="flex-row items-baseline justify-between gap-very-subtle">
          {label && (
            <Text className="font-sans text-caption text-alpha-inverse-strong">
              {label}
              {required ? <Text className="text-surface-danger-medium"> *</Text> : null}
            </Text>
          )}
          {hint && (
            <Text className="font-sans text-caption text-surface-on-neutral-medium">{hint}</Text>
          )}
        </View>
      )}
      <View className={textInputField({ focused, invalid, disabled })}>
        {leadingIcon && <Icon name={leadingIcon} size={16} className={iconTone} />}
        {prefix && (
          <Text className="font-sans text-caption text-surface-on-neutral-medium">{prefix}</Text>
        )}
        <RNTextInput
          editable={!disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChangeText={(t) => {
            setLength(t.length);
            onChangeText?.(t);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled, busy: loading }}
          className={cn(
            "min-w-0 flex-1 py-very-subtle font-sans text-body-md",
            // NativeWind's `placeholder:` variant moves the colour to `placeholderTextColor`.
            disabled
              ? "text-surface-on-neutral-subtle placeholder:text-surface-on-neutral-subtle"
              : "text-alpha-inverse-strong placeholder:text-surface-on-neutral-medium",
          )}
          {...rest}
        />
        {suffix && (
          <Text className="font-sans text-caption text-surface-on-neutral-medium">{suffix}</Text>
        )}
        {loading ? (
          <Spinner size={16} className={iconTone} />
        ) : trailingIcon ? (
          <Icon name={trailingIcon} size={16} className={iconTone} />
        ) : null}
      </View>
      {full && (message || (counter && maxLength)) && (
        <View className="flex-row items-start justify-between gap-very-subtle">
          <Text
            accessibilityRole={invalid ? "alert" : undefined}
            className={cn(
              "shrink font-sans text-caption",
              invalid ? "text-surface-danger-medium" : "text-surface-on-neutral-medium",
            )}
          >
            {message}
          </Text>
          {counter && maxLength ? (
            <Text className="font-sans text-caption text-surface-on-neutral-medium">
              {currentLength}/{maxLength}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
