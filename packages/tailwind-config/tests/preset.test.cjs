const test = require("node:test");
const assert = require("node:assert/strict");
const resolveConfig = require("tailwindcss/resolveConfig");
const preset = require("../index.cjs");

const cfg = resolveConfig({ presets: [preset], content: [] });

test("colours resolve to OMN1 CSS variables", () => {
  assert.equal(
    cfg.theme.colors.surface.primary.medium,
    "var(--omn1-semantic-surface-primary-medium)",
  );
  assert.equal(
    cfg.theme.colors.surface["on-primary"]["very-subtle"],
    "var(--omn1-semantic-surface-on-primary-very-subtle)",
  );
  assert.equal(
    cfg.theme.colors.alpha.neutral["very-subtle"],
    "var(--omn1-semantic-opacity-neutral-very-subtle)",
  );
  assert.equal(cfg.theme.colors.stroke.danger.medium, "var(--omn1-semantic-stroke-danger-medium)");
});

test("spacing, radius, stroke and type scales mirror the Figma ladders", () => {
  assert.equal(cfg.theme.spacing["very-subtle"], "var(--omn1-spacement-very-subtle)");
  assert.equal(cfg.theme.spacing["x2-5"], "var(--omn1-system-x2-5)");
  assert.equal(cfg.theme.borderRadius.subtle, "var(--omn1-border-radius-subtle)");
  assert.equal(
    cfg.theme.borderRadius["corner-very-subtle"],
    "var(--omn1-corner-radius-very-subtle)",
  );
  assert.equal(cfg.theme.borderWidth["very-subtle"], "var(--omn1-stroke-very-subtle)");
  assert.deepEqual(cfg.theme.fontSize["body-md"], [
    "var(--omn1-size-body-md)",
    { lineHeight: "var(--omn1-line-height-body-md)" },
  ]);
});

test("default Tailwind palette is not leaked", () => {
  assert.equal(cfg.theme.colors.red, undefined);
  assert.equal(cfg.theme.spacing[4], undefined);
});

test("focus rings use the Stroke ladder", () => {
  assert.equal(cfg.theme.ringWidth.medium, "var(--omn1-stroke-medium)");
});

test("`border` defaults to the thinnest Stroke token", () => {
  assert.equal(cfg.theme.borderWidth.DEFAULT, "var(--omn1-stroke-very-subtle)");
});
