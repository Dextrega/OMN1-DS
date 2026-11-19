import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Radiobutton (6:11948) — Selection On/Off × State Enabled/Hovered/Pressed/Active/Required/Error/Disabled, 20×20.
 *
 * PROVISIONAL: the Figma file could not be read when this was written (MCP access). Structure, size and the variant
 * matrix are from Figma; colours/strokes mirror the verified Checkbox and the selected dot size is assumed.
 * See docs/FIGMA-SYNC.md.
 *
 * State mapping:  Hovered → hover  ·  Pressed → active  ·  Active → focus-visible  ·  Required → `required`
 *                 Error → `invalid`  ·  Disabled → `disabled`  ·  Selection → `checked`
 */
export interface RadiobuttonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /** Figma: State=Error. */
  invalid?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  wrapperClassName?: string;
}

interface GroupContext {
  name: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
}
const RadioGroupContext = createContext<GroupContext | null>(null);

export const Radiobutton = forwardRef<HTMLInputElement, RadiobuttonProps>(function Radiobutton(
  {
    invalid,
    required,
    disabled,
    label,
    description,
    className,
    wrapperClassName,
    id,
    name,
    value,
    checked,
    onChange,
    ...rest
  },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const uid = useId();
  const inputId = id ?? `omn1-radio-${uid}`;
  const descId = `${inputId}-desc`;
  const isDisabled = disabled ?? group?.disabled;
  const isInvalid = invalid ?? group?.invalid ?? false;
  const isRequired = required ?? group?.required;

  const groupProps = group
    ? {
        name: group.name,
        checked: String(value) === group.value,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          group.onValueChange(String(value));
          onChange?.(e);
        },
      }
    : { name, checked, onChange };

  return (
    <div
      className={cn(
        "inline-flex items-start gap-very-subtle font-sans",
        isDisabled && "cursor-not-allowed",
        wrapperClassName,
      )}
    >
      <span className="relative inline-flex size-x2-5 shrink-0">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          value={value}
          disabled={isDisabled}
          required={isRequired}
          aria-invalid={isInvalid || undefined}
          aria-describedby={description ? descId : undefined}
          className={cn(
            "peer m-0 size-full cursor-pointer appearance-none rounded-full border border-very-subtle transition-colors duration-150",
            // unselected
            "border-alpha-inverse-subtle bg-surface-neutral-very-subtle",
            "hover:bg-alpha-inverse-very-subtle active:border-medium active:bg-alpha-inverse-very-subtle",
            "focus-visible:outline-none focus-visible:border-stroke-neutral-strong",
            // selected
            "checked:border-stroke-neutral-subtle checked:bg-surface-primary-medium checked:hover:bg-surface-primary-medium checked:active:bg-surface-primary-strong",
            // required
            "required:border-stroke-danger-medium",
            // error
            "aria-[invalid=true]:border-stroke-danger-medium aria-[invalid=true]:bg-surface-danger-very-subtle aria-[invalid=true]:hover:border-stroke-danger-strong",
            "aria-[invalid=true]:checked:bg-surface-danger-medium",
            // disabled
            "disabled:cursor-not-allowed disabled:border-stroke-neutral-subtle disabled:bg-surface-neutral-very-subtle disabled:hover:bg-surface-neutral-very-subtle",
            "disabled:checked:bg-surface-neutral-subtle",
            className,
          )}
          {...groupProps}
          {...rest}
        />
        <span
          aria-hidden="true"
          data-slot="dot"
          className="pointer-events-none absolute inset-0 m-auto hidden size-x1 rounded-full bg-surface-on-primary-very-subtle peer-checked:block peer-disabled:bg-surface-on-neutral-subtle"
        />
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "cursor-pointer text-body-md text-alpha-inverse-strong",
                isDisabled && "cursor-not-allowed text-surface-on-neutral-subtle",
              )}
            >
              {label}
              {isRequired && (
                <span aria-hidden="true" className="ml-extra-subtle text-surface-danger-medium">
                  *
                </span>
              )}
            </label>
          )}
          {description && (
            <span id={descId} className="text-caption text-surface-on-neutral-medium">
              {description}
            </span>
          )}
        </span>
      )}
    </div>
  );
});

export interface RadioGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Shared `name` for the native radios (generated if omitted). */
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
}

/** Convenience wrapper (not a Figma component): single selection across `Radiobutton`s. Arrow-key navigation is native. */
export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  disabled,
  invalid,
  required,
  orientation = "vertical",
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const uid = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const ctx: GroupContext = {
    name: name ?? `omn1-radiogroup-${uid}`,
    value: current,
    onValueChange: (v) => {
      if (value === undefined) setInner(v);
      onValueChange?.(v);
    },
    disabled,
    invalid,
    required,
  };
  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        aria-orientation={orientation}
        aria-invalid={invalid || undefined}
        aria-required={required || undefined}
        className={cn(
          "flex gap-subtle",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
