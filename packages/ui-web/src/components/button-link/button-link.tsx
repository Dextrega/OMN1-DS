import { Icon, type IconName } from "@omn1/icons";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: ButtonLink (6:11853) — a text-only, link-styled button.
 * Interactive states are CSS, not props:  Hovered → hover:  Pressed → active:  Focused → focus-visible:
 *                                          Disabled → `disabled` / `aria-disabled`  Loading → `loading`
 * Renders an `<a>` when `href` is given, otherwise a `<button>`.
 *
 * PROVISIONAL: the Figma file could not be read when this was written (MCP access). The prop surface mirrors ButtonCTA;
 * sizes, colours and the underline treatment are assumptions. See docs/FIGMA-SYNC.md.
 */
export const buttonLinkVariants = cva(
  [
    "relative inline-flex shrink-0 select-none items-center justify-center gap-extra-subtle rounded-corner-very-subtle",
    "font-sans font-medium whitespace-nowrap underline-offset-4",
    "transition-colors duration-150 motion-reduce:transition-none",
    "hover:underline active:no-underline",
    "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-stroke-secondary-medium",
    "aria-[disabled=true]:cursor-not-allowed aria-[disabled=true]:no-underline disabled:cursor-not-allowed disabled:no-underline",
  ],
  {
    variants: {
      size: {
        sm: "text-body-sm",
        md: "text-body-md",
        lg: "text-body-lg",
      },
      variation: {
        neutral:
          "text-surface-on-neutral-very-strong hover:text-surface-on-neutral-strong active:text-surface-on-neutral-medium",
        primary:
          "text-surface-primary-medium hover:text-surface-primary-strong active:text-surface-primary-very-strong",
        danger:
          "text-surface-danger-medium hover:text-surface-danger-strong active:text-surface-danger-very-strong",
        success:
          "text-surface-success-medium hover:text-surface-success-strong active:text-surface-success-very-strong",
        inverse:
          "text-surface-neutral-very-subtle hover:text-surface-neutral-subtle active:text-surface-neutral-medium",
      },
    },
    defaultVariants: { size: "md", variation: "primary" },
  },
);

export type ButtonLinkVariantProps = VariantProps<typeof buttonLinkVariants>;

interface ButtonLinkOwnProps extends ButtonLinkVariantProps {
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  /** Figma: State=Loading. Keeps its size, shows a spinner and ignores clicks. */
  loading?: boolean;
  children?: ReactNode;
}

type AsButton = ButtonLinkOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };
type AsAnchor = ButtonLinkOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string; disabled?: boolean };

export type ButtonLinkProps = AsButton | AsAnchor;

const ICON_PX = { sm: 16, md: 20, lg: 24 } as const;
const DISABLED = "text-surface-on-neutral-subtle hover:text-surface-on-neutral-subtle";

export const ButtonLink = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(props, ref) {
    const {
      size,
      variation,
      leadingIcon,
      trailingIcon,
      loading = false,
      className,
      children,
      ...rest
    } = props;
    const iconPx = ICON_PX[size ?? "md"];
    const classes = cn(
      buttonLinkVariants({ size, variation }),
      loading && "cursor-progress",
      className,
    );
    const content = (
      <>
        <span
          className={cn(
            "inline-flex items-center justify-center gap-extra-subtle",
            loading && "invisible",
          )}
        >
          {leadingIcon && <Icon name={leadingIcon} size={iconPx} />}
          {children}
          {trailingIcon && <Icon name={trailingIcon} size={iconPx} />}
        </span>
        {loading && (
          <Icon
            name="loader"
            size={iconPx}
            className="absolute animate-spin"
            aria-label="Loading"
          />
        )}
      </>
    );

    if (rest.href !== undefined) {
      const { disabled, onClick, href, ...anchor } = rest as Omit<
        AsAnchor,
        keyof ButtonLinkOwnProps
      >;
      const inert = disabled || loading;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={inert ? undefined : href}
          role={inert ? "link" : undefined}
          aria-disabled={inert || undefined}
          aria-busy={loading || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={(e: MouseEvent<HTMLAnchorElement>) =>
            inert ? e.preventDefault() : onClick?.(e)
          }
          className={cn(classes, disabled && DISABLED)}
          {...anchor}
        >
          {content}
        </a>
      );
    }

    const {
      disabled,
      onClick,
      type = "button",
      ...button
    } = rest as Omit<AsButton, keyof ButtonLinkOwnProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={(e: MouseEvent<HTMLButtonElement>) =>
          loading ? e.preventDefault() : onClick?.(e)
        }
        className={cn(classes, disabled && DISABLED)}
        {...button}
      >
        {content}
      </button>
    );
  },
);
