import type { ReactNode } from "react";
import { cssVar, type Leaf } from "./flatten";

/** A colour chip that reads the live CSS variable — so it follows the Storybook theme and brand toolbars. */
export function Swatch({ leaf, label }: { leaf: Leaf; label?: string }) {
  return (
    <div className="flex items-center gap-very-subtle">
      <span
        className="size-x5 shrink-0 rounded-very-subtle border border-stroke-neutral-subtle"
        style={{
          background: `${cssVar(leaf.name)}`,
          backgroundImage:
            "conic-gradient(#0001 25%, transparent 0 50%, #0001 0 75%, transparent 0)",
          backgroundSize: "8px 8px",
          position: "relative",
        }}
      >
        <span
          className="absolute inset-0 rounded-very-subtle"
          style={{ background: cssVar(leaf.name) }}
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-caption font-medium">
          {label ?? leaf.path.slice(1).join(" / ")}
        </span>
        <span className="truncate text-overline text-surface-on-neutral-medium">
          {String(leaf.value)}
        </span>
      </span>
    </div>
  );
}

export function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-strong">
      <h2 className="mb-extra-subtle text-subtitle font-semibold">{title}</h2>
      {note && (
        <p className="mb-subtle max-w-[72ch] text-body-sm text-surface-on-neutral-medium">{note}</p>
      )}
      {children}
    </section>
  );
}

/** Groups leaves by their path up to `depth` segments (after the layer). */
export function groupBy(leaves: Leaf[], depth: number) {
  const out = new Map<string, Leaf[]>();
  for (const leaf of leaves) {
    const key = leaf.path.slice(1, 1 + depth).join(" / ");
    out.set(key, [...(out.get(key) ?? []), leaf]);
  }
  return [...out.entries()];
}
