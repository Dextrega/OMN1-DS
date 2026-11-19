# Architecture

## One theme, two renderers

Everything visual is a CSS custom property named `--omn1-<token-name>`; Tailwind utilities are just aliases for them
(`bg-surface-primary-medium` → `background-color: var(--omn1-semantic-surface-primary-medium)`).

|                     | Web                                                                    | React Native                                                     |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Variables come from | `@omn1/tokens/css` (static CSS, light / dark / `prefers-color-scheme`) | `ThemeProvider` → `nativeVars()` → NativeWind `vars()`           |
| Why different       | Browsers support `var()` chains and `color-mix()`                      | RN has neither, so the theme is resolved in JS (`resolveColors`) |
| Styling             | Tailwind 3 + `@omn1/tailwind-config`                                   | NativeWind 4 + the **same** preset                               |
| States              | `hover:` `active:` `focus-visible:` `aria-*`                           | `active:` + component state                                      |

NativeWind 4 requires Tailwind 3, so the preset targets Tailwind 3.4. Moving to Tailwind 4 waits for NativeWind 5.

## Colour layers

`Primitives → Key → Semantic` (+ an optional parallel `Alias` layer that mirrors Figma and is unused by components).

- **Semantic** is the only layer components may use (`surface`, `stroke`, `background`, `alpha`).
- **Key** is the _brand layer_: 7 steps for each of primary, neutral, success, secondary, warning, danger, information.
- **Primitives** are raw ramps. In Dark mode the ramps are inverted (see [FINDINGS](FINDINGS.md)), so every layer is emitted per theme.
- Semantic `Opacity` tokens are a Key colour at a fixed alpha. On the web they are `color-mix(in srgb, <key> N%, transparent)`,
  so they follow brand overrides. Tailwind exposes them as `alpha-*` (a real `opacity-*` utility already exists).

## Why `--omn1-*` variables are declared on every theme scope

CSS resolves `var()` where a property is _declared_. If only the changed tokens were re-declared in `[data-theme="dark"]`,
a nested dark region would inherit already-resolved light values for everything else. So `tokens.css` re-declares the whole
themed set for each scope; nested scopes and per-region brands work.

## Tailwind theme is replaced, not extended

`p-4` or `text-red-500` do not exist: only utilities backed by a Figma variable do. That keeps design-to-code honest.
Utilities mirror the Figma ladders: `p-subtle`, `gap-very-subtle`, `rounded-subtle`, `rounded-corner-subtle`, `border-very-subtle`,
`text-body-md` (size + line height), `min-h-x6`, `bg-surface-primary-medium`, `border-stroke-danger-medium`, `bg-alpha-inverse-very-subtle`.

## Guard rails (tests)

- `packages/tokens`: layering preserved as CSS references, alpha derivation, brand propagation, light/dark parity, Figma map covers the components' variables.
- `packages/tailwind-config`: the preset mirrors the Figma ladders; default palette doesn't leak.
- `packages/ui-web`: **every class a component can emit exists as a real Tailwind rule** (catches typos, renamed variables, concatenated class names).
- `packages/ui-native`: every class **compiles with NativeWind's own compiler**, and every variable a rule reads is provided by the ThemeProvider.
