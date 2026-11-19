import { Icon, type IconName } from "@omn1/icons";
import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: TextInput (component set 6:9944) — Appearance Full (88h) / Compact (48h) × State.
 *
 * State mapping:  Hovered → hover  ·  Active → focus-within  ·  Filled → has value
 *                 Required → `required`  ·  Error → `error`  ·  Loading → `loading`
 *                 AutoCompleted → :autofill  ·  Disabled → `disabled`
 * Verified: Enabled geometry + tokens (min-h 48, Spacement/Subtle, Border Radius/VerySubtle, fill Opacity/Inverse/VerySubtle,
 * 12px label, 14px placeholder, 16px icons). Provisional: stroke colours per state, Compact layout, Loading/AutoCompleted looks.
 */
export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  /** Full shows label, hint, helper and counter. Compact is the bare 48px field. */
  appearance?: "full" | "compact";
  label?: string;
  /** Short hint beside the label, e.g. "optional". */
  hint?: string;
  /** Helper text under the field. */
  helper?: string;
  /** Error message. Presence switches the field to the Error state. */
  error?: string;
  /** Shows `n/maxLength` (requires `maxLength`). */
  counter?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  /** Class for the outer wrapper (the `className` prop goes to the `<input>`). */
  wrapperClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
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
    required,
    disabled,
    className,
    wrapperClassName,
    id,
    maxLength,
    onChange,
    value,
    defaultValue,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `omn1-input-${uid}`;
  const helperId = `${inputId}-helper`;
  const invalid = Boolean(error);
  const [length, setLength] = useState(String(value ?? defaultValue ?? "").length);
  const currentLength = value !== undefined ? String(value).length : length;
  const message = error ?? helper;
  const showFull = appearance === "full";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className={cn("flex w-full flex-col gap-very-subtle font-sans", wrapperClassName)}>
      {(label || hint) && (
        <div
          className={cn(
            "flex items-baseline justify-between gap-very-subtle",
            !showFull && "sr-only",
          )}
        >
          {label && (
            <label htmlFor={inputId} className="text-caption font-medium text-alpha-inverse-strong">
              {label}
              {required && (
                <span aria-hidden="true" className="ml-extra-subtle text-surface-danger-medium">
                  *
                </span>
              )}
            </label>
          )}
          {hint && <span className="text-caption text-surface-on-neutral-medium">{hint}</span>}
        </div>
      )}

      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        className={cn(
          "group flex min-h-x6 items-center gap-very-subtle rounded-very-subtle border border-very-subtle px-subtle",
          "bg-alpha-inverse-very-subtle text-body-md text-alpha-inverse-strong transition-colors duration-150",
          "border-transparent hover:border-stroke-neutral-subtle focus-within:border-stroke-neutral-strong",
          invalid &&
            "border-stroke-danger-medium hover:border-stroke-danger-strong focus-within:border-stroke-danger-strong",
          disabled &&
            "cursor-not-allowed border-transparent bg-alpha-neutral-very-subtle text-surface-on-neutral-subtle hover:border-transparent",
        )}
      >
        {leadingIcon && <Icon name={leadingIcon} size={16} className="shrink-0" />}
        {prefix && (
          <span className="shrink-0 text-caption text-surface-on-neutral-medium">{prefix}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          aria-busy={loading || undefined}
          aria-describedby={message ? helperId : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent py-very-subtle text-body-md outline-none",
            "placeholder:text-body-sm placeholder:text-surface-on-neutral-medium",
            "disabled:cursor-not-allowed disabled:placeholder:text-surface-on-neutral-subtle",
            "autofill:shadow-[inset_0_0_0_1000px_var(--omn1-semantic-surface-primary-very-subtle)]",
            className,
          )}
          {...rest}
        />
        {suffix && (
          <span className="shrink-0 text-caption text-surface-on-neutral-medium">{suffix}</span>
        )}
        {loading ? (
          <Icon name="loader" size={16} className="shrink-0 animate-spin" aria-label="Loading" />
        ) : (
          trailingIcon && <Icon name={trailingIcon} size={16} className="shrink-0" />
        )}
      </div>

      {showFull && (message || (counter && maxLength)) && (
        <div className="flex items-start justify-between gap-very-subtle text-caption">
          <p
            id={helperId}
            role={invalid ? "alert" : undefined}
            className={cn(
              invalid ? "text-surface-danger-medium" : "text-surface-on-neutral-medium",
            )}
          >
            {message}
          </p>
          {counter && maxLength ? (
            <span className="shrink-0 text-surface-on-neutral-medium" aria-hidden="true">
              {currentLength}/{maxLength}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
});
