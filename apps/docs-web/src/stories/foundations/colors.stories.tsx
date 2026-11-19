import type { Meta, StoryObj } from "@storybook/react-vite";
import { colorLayer } from "../../docs/flatten";
import { Section, Swatch, groupBy } from "../../docs/swatch";

const meta: Meta = { title: "Foundations/Colors", parameters: { layout: "fullscreen" } };
export default meta;

function Layer({
  layer,
  depth,
  title,
  note,
}: {
  layer: "primitives" | "key" | "semantic" | "alias";
  depth: number;
  title: string;
  note: string;
}) {
  return (
    <Section title={title} note={note}>
      <div
        className="grid gap-strong"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {groupBy(colorLayer(layer), depth).map(([group, leaves]) => (
          <div key={group} className="flex flex-col gap-very-subtle">
            <h3 className="text-body-md font-semibold capitalize">{group}</h3>
            {leaves.map((l) => (
              <Swatch key={l.name} leaf={l} />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

export const Architecture: StoryObj = {
  render: () => (
    <div className="p-strong">
      <h1 className="mb-subtle text-title font-semibold">Colour architecture</h1>
      <p className="mb-strong max-w-[72ch] text-body-md text-surface-on-neutral-medium">
        Colours flow <b>Primitives → Key → Semantic</b>. Components only use Semantic tokens. A
        client brand overrides the <b>Key</b> layer (and optionally typography / icons / assets)
        through <code>ThemeProvider</code>; everything below follows. Switch Theme and Brand in the
        toolbar to see the swatches react.
      </p>
      <Layer
        layer="semantic"
        depth={2}
        title="Semantic"
        note="What components use: Surface, On-surface, Stroke, Background and Alpha (Figma: Opacity) — grouped by role."
      />
      <Layer
        layer="key"
        depth={1}
        title="Key"
        note="The brand layer: seven steps per role (primary, neutral, success, secondary, warning, danger, information)."
      />
      <Layer
        layer="primitives"
        depth={1}
        title="Primitives"
        note="Raw ramps (100–900). Dark mode inverts each ramp."
      />
    </div>
  ),
};

export const Alias: StoryObj = {
  name: "Alias (optional layer)",
  render: () => (
    <div className="p-strong">
      <Layer
        layer="alias"
        depth={2}
        title="Alias"
        note="Mirrors Figma's parallel Alias collection: references Primitives directly. Not used by any component; import @omn1/tokens/css/alias.css to use it."
      />
    </div>
  ),
};
