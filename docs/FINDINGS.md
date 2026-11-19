# Findings in the Figma file / token export

Found while importing. None block the build; each is a decision for design. Code preserves Figma's values and names as exported.

## Tokens that look wrong or surprising

1. **Bold = Semi Bold = 600.** `Weight` has _Semi Bold 600_ and _Bold 600_, then _Extra Bold 700_ and _Black 800_. Probably an off-by-one (Bold 700, Extra Bold 800, Black 900). Exported as is.
2. **Primitives are mode-dependent.** Dark mode inverts every 100–900 ramp (155 of 173 primitives differ) and `Global.White` is `#000000` in Dark. Unusual for a primitive layer; it works, but "primitive" colours are no longer constants. Consequence: Tailwind `white` / `black` would flip, so they are exposed as `global-white` / `global-black`.
3. **`Key.Global.White` / `Black` flip in Dark** for the same reason — the names describe the light theme.
4. **Two radius ladders with the same step names and different values.** `Border Radius` (Medium = 16) vs `Corner Radius` (Medium = 24). Both are used (MD buttons use the former; LG / SM buttons the latter). Exposed as `rounded-*` and `rounded-corner-*`. Consider one ladder.
5. **`Spacement`** is the collection name (should be _Spacing_). Kept for a 1:1 Figma ↔ code mapping; renaming is one line in `normalize.mjs`.
6. **Typography leftovers inside `Colors/Light`.** `fontFamilies`, `fontWeights`, `fontSize` (10…200), `letterSpacing` (**%**), `paragraph*`, and the composite `Display` styles live in the _Light_ colour set only. Typography's own `Letter Spacing` is in **px**. Two units for one concept.
7. **Typo:** the Display style `TItle` (sanitised to `title`).
8. **Alias layer.** 192 tokens that reference Primitives directly, parallel to Key / Semantic and unused by every component. Emitted to `alias.css` only.
9. **Unused primitive families:** Blizzard, Cappuccino, Cream, Sand, Tangerine.
10. **Mixed languages in primitive names:** Ardosia, Coral, Verde, Roxo, Creme, Amarelo, Vermelho (PT) next to Slate, Mint, Lavender … (EN).
11. **No font-family variable for UI text.** Components use **Barlow Medium** (OFL, bundled via Fontsource / expo-google-fonts). Declared in code. The only family in the export is **Forma DJR Display**, a commercial typeface — **confirm the licence** before distributing it with a client app; the repo does not bundle it.
12. **Semantic `Opacity`** is really "Key colour at N% alpha" (not an opacity). Renamed `alpha-*` in Tailwind to avoid clashing with `opacity-*`.

## Component naming in Figma

- `Variation` (buttons) vs `Variant` (badge, others).
- `Actived` (should likely be _Active_), `DIsablede (Filled)`, `Appearabce` (ComboBox), `Sharped` / `Squared`, `Carroussel`.
- Interactive states (Hovered, Pressed, Focused, Actived) are variants; code treats them as pseudo-classes / pressable state (see FIGMA-SYNC).
