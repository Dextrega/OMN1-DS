import { Icon } from "@omn1/icons";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Checkbox (component set 6:11899) — Selection Unselected/Indeterminate/Selected × State.
 * All 21 variants verified: 20×20 box, Border Radius/ExtraSubtle, Stroke/VerySubtle, 16px check / minus.
 *
 * State mapping:  Hovered → hover  ·  Pressed → active  ·  Active → focus-visible  ·  Required → `required`
 *                 Error → `invalid`  ·  Disabled → `disabled`  ·  Selection → `checked` / `indeterminate`
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  /** Figma: Selection=Indeterminate. */
  indeterminate?: boolean;
  /** Figma: State=Error. */
  invalid?: boolean;
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  wrapperClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    indeterminate = false,
    invalid = false,
    required,
    disabled,
    label,
    description,
    className,
    wrapperClassName,
    id,
    ...rest
  },
  ref,
) {
  const uid = useId();
  const inputId = id ?? `omn1-checkbox-${uid}`;
  const descId = `${inputId}-desc`;
  const inner = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLInputElement);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div
      className={cn(
        "inline-flex items-start gap-very-subtle font-sans",
        disabled && "cursor-not-allowed",
        wrapperClassName,
      )}
    >
      <span className="relative inline-flex size-x2-5 shrink-0">
        <input
          ref={inner}
          id={inputId}
          type="checkbox"
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={description ? descId : undefined}
          aria-checked={indeterminate ? "mixed" : undefined}
          className={cn(
            "peer m-0 size-full cursor-pointer appearance-none rounded-extra-subtle border border-very-subtle transition-colors duration-150",
            // unselected
            "border-alpha-inverse-subtle bg-surface-neutral-very-subtle",
            "hover:bg-alpha-inverse-very-subtle active:border-medium active:bg-alpha-inverse-very-subtle",
            "focus-visible:outline-none focus-visible:border-stroke-neutral-strong",
            // selected / indeterminate
            "checked:border-stroke-neutral-subtle checked:bg-surface-primary-medium checked:hover:border-alpha-primary-subtle checked:hover:bg-surface-primary-medium checked:active:bg-surface-primary-strong",
            "indeterminate:border-stroke-neutral-subtle indeterminate:bg-surface-primary-medium indeterminate:hover:bg-surface-primary-medium indeterminate:active:bg-surface-primary-strong",
            // required
            "required:border-stroke-danger-medium",
            // error
            "aria-[invalid=true]:border-stroke-danger-medium aria-[invalid=true]:bg-surface-danger-very-subtle aria-[invalid=true]:hover:border-stroke-danger-strong",
            "aria-[invalid=true]:checked:bg-surface-danger-medium aria-[invalid=true]:indeterminate:bg-surface-danger-medium",
            // disabled
            "disabled:cursor-not-allowed disabled:border-stroke-neutral-subtle disabled:bg-surface-neutral-very-subtle disabled:hover:bg-surface-neutral-very-subtle",
            "disabled:checked:bg-surface-neutral-subtle disabled:indeterminate:bg-surface-neutral-subtle",
            className,
          )}
          {...rest}
        />
        <Icon
          name="check"
          size={16}
          strokeWidth={2.5}
          className="pointer-events-none absolute inset-0 m-auto hidden text-surface-on-primary-very-subtle peer-checked:block peer-indeterminate:hidden peer-disabled:text-surface-on-neutral-subtle"
        />
        <Icon
          name="minus"
          size={16}
          strokeWidth={2.5}
          className="pointer-events-none absolute inset-0 m-auto hidden text-surface-on-primary-very-subtle peer-indeterminate:block peer-disabled:text-surface-on-neutral-subtle"
        />
      </span>
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <label
              htmlFor={inputId}
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
