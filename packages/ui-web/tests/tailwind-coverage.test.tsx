import preset from "@omn1/tailwind-config";
import { render } from "@testing-library/react";
import postcss from "postcss";
import tailwind from "tailwindcss";
import { describe, expect, it } from "vitest";
import { Badge, ButtonCTA, ButtonIcon, Checkbox, TextInput } from "../src";

/**
 * Every class a component can emit must exist as a real utility generated from the OMN1 preset.
 * This catches the two classic design-to-code failures: a class that names a token which doesn't exist
 * (typo / renamed Figma variable) and a class built by string concatenation that Tailwind can't see.
 */
const sizes = ["xs", "sm", "md", "lg"] as const;
const variations = ["neutral", "primary", "success", "danger", "inverse"] as const;
const appearances = ["solid", "outlined", "ghost"] as const;
const badgeVariants = [
  "neutral",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "disabled",
] as const;
const badgeAppearances = ["subtle", "strong", "outlined"] as const;

function renderEverything() {
  return render(
    <div>
      {sizes.flatMap((size) =>
        variations.flatMap((variation) =>
          appearances.map((appearance) => (
            <div key={`${size}${variation}${appearance}`}>
              <ButtonCTA
                size={size}
                variation={variation}
                appearance={appearance}
                leadingIcon="plus"
                trailingIcon="arrow-right"
              >
                Button
              </ButtonCTA>
              <ButtonCTA size={size} variation={variation} appearance={appearance} loading disabled>
                Loading
              </ButtonCTA>
              <ButtonIcon
                size={size}
                variation={variation}
                appearance={appearance}
                icon="heart"
                aria-label="Like"
                dot
              />
            </div>
          )),
        ),
      )}
      {sizes.slice(0, 3).flatMap((size) =>
        badgeVariants.flatMap((variant) =>
          badgeAppearances.map((appearance) => (
            <Badge
              key={`${size}${variant}${appearance}`}
              size={size === "xs" ? "sm" : (size as "sm" | "md")}
              variant={variant}
              appearance={appearance}
              leadingIcon="info"
            >
              Badge
            </Badge>
          )),
        ),
      )}
      <Badge size="lg">Large</Badge>
      <TextInput
        label="Full"
        hint="optional"
        helper="Helper"
        counter
        maxLength={20}
        prefix="R$"
        suffix="kg"
        leadingIcon="search"
        trailingIcon="eye"
        required
      />
      <TextInput label="Compact" appearance="compact" loading />
      <TextInput label="Error" error="Something is wrong" />
      <TextInput label="Disabled" disabled />
      <Checkbox label="One" description="More" />
      <Checkbox label="Two" defaultChecked required />
      <Checkbox label="Three" indeterminate invalid />
      <Checkbox label="Four" disabled defaultChecked />
    </div>,
  );
}

const escape = (cls: string) => cls.replace(/[^a-zA-Z0-9_-]/g, (c) => `\\${c}`);
const MARKERS = new Set(["peer", "group"]); // referenced by other selectors, have no rule of their own
const isThirdParty = (c: string) => c.startsWith("lucide"); // class names lucide-react puts on its <svg>
const hasRule = (css: string, cls: string) =>
  new RegExp(`\\.${escape(cls).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w\\\\-])`).test(css);

describe("Tailwind coverage", () => {
  it("generates a rule for every class used by the components", async () => {
    const { container } = renderEverything();
    const html = container.innerHTML;
    const classes = new Set<string>();
    container.querySelectorAll("*").forEach((el) =>
      el
        .getAttribute("class")
        ?.split(/\s+/)
        .filter(Boolean)
        .forEach((c) => classes.add(c)),
    );
    expect(classes.size).toBeGreaterThan(100);

    const result = await postcss([
      tailwind({
        presets: [preset],
        content: [{ raw: html, extension: "html" }],
        corePlugins: { preflight: false },
      }),
    ]).process("@tailwind utilities;", { from: undefined });

    const missing = [...classes].filter(
      (c) => !MARKERS.has(c) && !isThirdParty(c) && !hasRule(result.css, c),
    );
    expect(missing).toEqual([]);
  });
});
