import {
  forwardRef,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Toggle (6:11983) — Selection On/Off × State Enabled/Hovered/Pressed/Active/Required/Error/Disabled, 56×28.
 *
 * Anatomy: track (56×28, fully rounded, 4px inset) + thumb (20×20) that travels 28px.
 * Motion: thumb slides and the track recolours in 200ms ease-out; disabled by `prefers-reduced-motion`.
 *
 * PROVISIONAL: the Figma file could not be read when this was written (MCP access). Size and the variant matrix are from
 * Figma; colours and the motion timing are assumptions. See docs/FIGMA-SYNC.md.
 */
export interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "role" | "children"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Figma: State=Error. */
  invalid?: boolean;
  /** Figma: State=Required. */
  required?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  /** Renders a hidden input so the toggle takes part in native form submission. */
  name?: string;
  value?: string;
  wrapperClassName?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    checked,
    defaultChecked = false,
    onCheckedChange,
    invalid = false,
    required,
    disabled,
    label,
    description,
    name,
    value = "on",
    className,
    wrapperClassName,
    id,
    onClick,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const buttonId = id ?? `omn1-toggle-${uid}`;
  const labelId = `${buttonId}-label`;
  const descId = `${buttonId}-desc`;
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (checked === undefined) setInner(!on);
    onCheckedChange?.(!on);
  };

  return (
    <div
      className={cn(
        "inline-flex items-start gap-very-subtle font-sans",
        disabled && "cursor-not-allowed",
        wrapperClassName,
      )}
    >
      <button
        ref={ref}
        id={buttonId}
        type="button"
        role="switch"
        aria-checked={on}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={description ? descId : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "group relative inline-flex h-x3-5 w-x7 shrink-0 cursor-pointer items-center rounded-full p-x0-5",
          "transition-colors duration-200 ease-out motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-stroke-secondary-medium",
          // off
          "bg-surface-neutral-subtle hover:bg-surface-neutral-medium active:bg-surface-neutral-strong",
          // on
          "aria-checked:bg-surface-primary-medium aria-checked:hover:bg-surface-primary-strong aria-checked:active:bg-surface-primary-very-strong",
          // required (while off) and error
          required && !on && "ring-very-subtle ring-inset ring-stroke-danger-medium",
          "aria-[invalid=true]:ring-very-subtle aria-[invalid=true]:ring-inset aria-[invalid=true]:ring-stroke-danger-medium",
          "aria-[invalid=true]:aria-checked:bg-surface-danger-medium aria-[invalid=true]:aria-checked:hover:bg-surface-danger-strong",
          // disabled
          "disabled:pointer-events-none disabled:bg-alpha-inverse-very-subtle disabled:aria-checked:bg-alpha-inverse-subtle",
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          data-slot="thumb"
          className={cn(
            "pointer-events-none size-x2-5 rounded-full bg-surface-neutral-very-subtle shadow-none",
            "translate-x-0 transition-transform duration-200 ease-out motion-reduce:transition-none",
            "group-aria-checked:translate-x-x3-5 group-aria-checked:bg-surface-on-primary-very-subtle",
            "group-disabled:bg-surface-neutral-very-subtle",
          )}
        />
      </button>
      {name && <input type="hidden" name={name} value={on ? value : ""} disabled={disabled} />}
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span
              id={labelId}
              onClick={() => !disabled && document.getElementById(buttonId)?.click()}
              className={cn(
                "cursor-pointer text-body-md text-alpha-inverse-strong",
                disabled && "cursor-not-allowed text-surface-on-neutral-subtle",
              )}
            >
              {label}
              {required && (
                <span aria-hidden="true" className="ml-extra-subtle text-surface-danger-medium">
                  *
                </span>
              )}
            </span>
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
