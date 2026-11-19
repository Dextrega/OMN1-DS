# Figma ↔ code

File: **Design System — ©2026 0MN1** · key `O7TkV8JbHl3Svw4M7LbCcg`

## Components

| Component  | Figma node                   | Variants                                                | Verified against Figma                                                                                                                                        | Provisional (needs an extraction pass)                                                                        |
| ---------- | ---------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ButtonCTA  | `6:9388` (page _Button_)     | 4 sizes × 5 variations × 3 appearances × 7 states = 420 | **Solid**: all sizes' geometry, radius, padding, text sizes; Enabled / Hovered fills and text colours; Disabled; Focused / Actived strokes; Loading structure | **Outlined** and **Ghost** colours; Pressed fills for Neutral / Inverse                                       |
| ButtonIcon | `2058:749`                   | same 420-variant matrix                                 | **MD / Primary / Solid / Enabled** (48×48, 20px icon, padding, radius)                                                                                        | other sizes' icon metrics and padding, DotStatus offsets, all non-Solid appearances                           |
| Badge      | `6:9302` (page _Feedback_)   | 3 sizes × 7 variants × 3 appearances = 63               | **MD / Neutral / Strong** (24h, paddings, radius, 12/16 text, 12px icon); heights SM 16 / MD 24 / LG 32                                                       | Subtle and Outlined colour pairings; SM / LG paddings and text sizes; other variants' Strong pairing          |
| TextInput  | `6:9944` (page _Inputs_)     | Full 88h / Compact 48h × 11 states = 22                 | **Enabled** geometry and tokens (48 min-h, paddings, radius, fill, label / helper / placeholder styles, 16px icons)                                           | per-state stroke colours (Hover / Active / Error / Disabled), Compact layout, Loading and AutoCompleted looks |
| Checkbox   | `6:11899` (page _Selection_) | 3 selections × 7 states = 21                            | **All 21 variants**                                                                                                                                           | —                                                                                                             |

Provisional pieces are marked in each component's doc comment and show in Storybook's component description.
To close the gap: extract the missing variants with `get_design_context` / `use_figma` (read-only) and update the class maps.
(The Figma MCP Starter-plan call limit was reached during the first pass — the extraction can resume once it resets or on a paid seat.)

## State mapping

Figma models interaction as variant props. Code uses the platform's own mechanism:

| Figma state               | Web                                                                | React Native        |
| ------------------------- | ------------------------------------------------------------------ | ------------------- |
| Enabled                   | default                                                            | default             |
| Hovered                   | `hover:`                                                           | — (touch)           |
| Pressed                   | `active:`                                                          | `active:`           |
| Focused                   | `focus-visible:` ring (`Stroke/Medium`, `Stroke/Secondary/Medium`) | —                   |
| Actived                   | `aria-pressed="true"` (assumed: a toggled / selected button)       | —                   |
| Active (inputs, checkbox) | `focus-within` / `focus-visible`                                   | focused state       |
| Required                  | `required`                                                         | `required`          |
| Error                     | `error` / `invalid`                                                | `error` / `invalid` |
| Loading                   | `loading` prop                                                     | `loading` prop      |
| Disabled                  | `disabled`                                                         | `disabled`          |

"Actived" is an assumption — confirm with design.

## Icons

Component instances in Figma are named after Lucide icons where checked (`check`, `minus`), but the shared library holds custom
`ic_*` components. `@omn1/icons` exposes a curated Lucide vocabulary (34 names). Confirm the `ic_*` → Lucide name mapping and extend
`packages/icons/src/names.ts` (a test keeps web / native registries in sync).

## Not set up yet

- **Code Connect** (`*.figma.tsx`): needs an Organization / Enterprise Figma plan. Until then, `figma-variable-map.json` plus
  [CLAUDE.md](../CLAUDE.md) is the contract for agents.
- **Tokens Studio → GitHub sync**: recommended, so a Figma change opens a PR touching only `packages/tokens/figma-export/`.
- **Supernova.io** documentation: phase 2.
