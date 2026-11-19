import { Toggle } from "@omn1/ui-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { label: "Notifications" },
  parameters: {
    docs: {
      description: {
        component:
          "Figma: **Toggle** (6:11983), 14 variants (Selection × State), 56×28. Provisional — not yet verified against Figma (MCP access was unavailable). Variant matrix and sizes come from Figma; colours and motion are assumptions. See docs/FIGMA-SYNC.md.",
      },
    },
  },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = { args: { description: "Push and e-mail." } };

export const Matrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      className="grid gap-strong p-strong"
      style={{ gridTemplateColumns: "repeat(2, max-content)" }}
    >
      {(["Enabled", "Required", "Error", "Disabled"] as const).flatMap((state) =>
        [false, true].map((on) => (
          <Toggle
            key={`${state}${on}`}
            label={`${on ? "On" : "Off"} · ${state}`}
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
