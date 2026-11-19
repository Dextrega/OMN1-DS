import { RadioGroup, Radiobutton } from "@omn1/ui-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Radiobutton",
  component: Radiobutton,
  tags: ["autodocs"],
  args: { label: "Option" },
  parameters: {
    docs: {
      description: {
        component:
          "Figma: **Radiobutton** (6:11948), 14 variants (Selection × State), 20×20. Provisional — not yet verified against Figma (MCP access was unavailable). Variant matrix and sizes come from Figma; colours and motion are assumptions. See docs/FIGMA-SYNC.md.",
      },
    },
  },
} satisfies Meta<typeof Radiobutton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Selected: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = { args: { description: "Shown under the label." } };

export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="b" aria-label="Plan">
      <Radiobutton value="a" label="Starter" />
      <Radiobutton value="b" label="Pro" description="Recommended" />
      <Radiobutton value="c" label="Enterprise" disabled />
    </RadioGroup>
  ),
};

export const Matrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      className="grid gap-strong p-strong"
      style={{ gridTemplateColumns: "repeat(2, max-content)" }}
    >
      {(["Enabled", "Required", "Error", "Disabled"] as const).flatMap((state) =>
        [false, true].map((on) => (
          <Radiobutton
            key={`${state}${on}`}
            name={`m-${state}${on}`}
            label={`${on ? "Selected" : "Unselected"} · ${state}`}
            required={state === "Required"}
            invalid={state === "Error"}
            disabled={state === "Disabled"}
            defaultChecked={on}
          />
        )),
      )}
    </div>
  ),
};
