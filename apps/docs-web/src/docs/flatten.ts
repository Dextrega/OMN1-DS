import { tokens } from "@omn1/tokens";

export type Leaf = { name: string; path: string[]; value: unknown };

/** Flattens a nested token tree into [{ name: "key-primary-medium", path, value }]. */
export function flatten(node: unknown, trail: string[] = []): Leaf[] {
  if (node !== null && typeof node === "object" && !Array.isArray(node)) {
    return Object.entries(node).flatMap(([k, v]) => flatten(v, [...trail, k]));
  }
  return [{ name: trail.join("-"), path: trail, value: node }];
}

export const cssVar = (name: string) => `var(--omn1-${name})`;
export const colorLayer = (layer: "primitives" | "key" | "semantic" | "alias") =>
  flatten(tokens.light[layer], [layer]);
export const shared = (group: string) =>
  flatten((tokens.shared as Record<string, unknown>)[group], [group]);
