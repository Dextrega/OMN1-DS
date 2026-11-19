import { Icon, type IconName } from "@omn1/icons";
import { cva } from "class-variance-authority";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Figma: Tabs (235:1156) with its child `_TabsBase` (228:209) — exported as `Tabs` / `TabsList` / `TabsBase` / `TabsPanel`.
 *
 * `TabsBase` is one tab. Interactive states are CSS:  Hovered → hover:  Pressed → active:  Focused → focus-visible:
 *                                                      Selected → `aria-selected`  Disabled → `disabled`
 * Motion: the active indicator scales in from the centre (200ms) and the label recolours (150ms).
 * Keyboard: roving tabindex, ←/→ (↑/↓ when vertical), Home/End; Disabled tabs are skipped.
 *
 * PROVISIONAL: the Figma files could not be read when this was written (MCP access) — neither the variant matrix nor the
 * measurements are verified. Everything here is an assumption modelled on the other components; the compound/slot
 * structure (a list of tab bases plus panels) is the standard pattern. See docs/FIGMA-SYNC.md.
 */
interface TabsContext {
  baseId: string;
  value: string | undefined;
  select: (value: string) => void;
  orientation: "horizontal" | "vertical";
}
const Ctx = createContext<TabsContext | null>(null);
const useTabs = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Tabs components must be rendered inside <Tabs>");
  return ctx;
};

const tabId = (base: string, value: string) => `${base}-tab-${value}`;
const panelId = (base: string, value: string) => `${base}-panel-${value}`;

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const select = useCallback(
    (v: string) => {
      if (value === undefined) setInner(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );
  return (
    <Ctx.Provider value={{ baseId, value: current, select, orientation }}>
      <div
        className={cn(
          "flex font-sans",
          orientation === "vertical" ? "flex-row gap-medium" : "flex-col",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, onKeyDown, ...rest },
  ref,
) {
  const { orientation } = useTabs();
  const inner = useRef<HTMLDivElement | null>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const tabs = Array.from(
      inner.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    );
    if (!tabs.length) return;
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    const [prev, next] =
      orientation === "vertical" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    let target: HTMLButtonElement | undefined;
    if (e.key === next) target = tabs[(i + 1) % tabs.length];
    else if (e.key === prev) target = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") target = tabs[0];
    else if (e.key === "End") target = tabs[tabs.length - 1];
    if (target) {
      e.preventDefault();
      target.focus();
      target.click();
    }
  };
  return (
    <div
      ref={(node) => {
        inner.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex",
        orientation === "vertical"
          ? "flex-col border-l border-very-subtle border-stroke-neutral-subtle"
          : "flex-row border-b border-very-subtle border-stroke-neutral-subtle",
        className,
      )}
      {...rest}
    />
  );
});

/** Figma: _TabsBase. */
export const tabsBaseVariants = cva(
  [
    "relative inline-flex shrink-0 select-none items-center justify-center gap-extra-subtle whitespace-nowrap",
    "px-subtle py-very-subtle font-sans font-medium text-body-md",
    "transition-colors duration-150 motion-reduce:transition-none",
    "text-surface-on-neutral-medium hover:text-surface-on-neutral-very-strong hover:bg-alpha-neutral-very-subtle active:bg-alpha-neutral-subtle",
    "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-inset focus-visible:ring-stroke-secondary-medium",
    // selected
    "aria-selected:text-surface-primary-medium aria-selected:hover:text-surface-primary-strong",
    // indicator (scale-in from centre)
    "after:pointer-events-none after:absolute after:bg-surface-primary-medium after:transition-transform after:duration-200 after:ease-out motion-reduce:after:transition-none",
    "after:scale-0 aria-selected:after:scale-100",
    // disabled
    "disabled:pointer-events-none disabled:text-surface-on-neutral-subtle disabled:hover:bg-transparent",
  ],
  {
    variants: {
      orientation: {
        horizontal: "after:inset-x-0 after:bottom-0 after:h-x0-5",
        vertical: "justify-start after:inset-y-0 after:left-0 after:w-x0-5",
      },
    },
    defaultVariants: { orientation: "horizontal" },
  },
);

export interface TabsBaseProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "role"
> {
  /** Identifies the tab and links it to its `TabsPanel`. */
  value: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  children?: ReactNode;
}

export const TabsBase = forwardRef<HTMLButtonElement, TabsBaseProps>(function TabsBase(
  { value, leadingIcon, trailingIcon, className, children, onClick, type = "button", ...rest },
  ref,
) {
  const ctx = useTabs();
  const selected = ctx.value === value;
  return (
    <button
      ref={ref}
      type={type}
      role="tab"
      id={tabId(ctx.baseId, value)}
      aria-selected={selected}
      aria-controls={panelId(ctx.baseId, value)}
      tabIndex={selected ? 0 : -1}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx.select(value);
      }}
      className={cn(tabsBaseVariants({ orientation: ctx.orientation }), className)}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={20} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={20} />}
    </button>
  );
});

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, className, ...rest },
  ref,
) {
  const ctx = useTabs();
  const selected = ctx.value === value;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId(ctx.baseId, value)}
      aria-labelledby={tabId(ctx.baseId, value)}
      hidden={!selected}
      tabIndex={0}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-medium focus-visible:ring-stroke-secondary-medium",
        className,
      )}
      {...rest}
    />
  );
});
