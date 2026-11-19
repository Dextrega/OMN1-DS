import { ButtonLink } from "@omn1/ui-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  args: { children: "Learn more" },
  parameters: {
    docs: {
      description: {
        component:
          "Figma: **ButtonLink** (6:11853). Provisional — not yet verified against Figma (MCP access was unavailable). Variant matrix and sizes come from Figma; colours and motion are assumptions. See docs/FIGMA-SYNC.md.",
      },
    },
  },
} satisfies Meta<typeof ButtonLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const AsAnchor: Story = { args: { href: "https://example.com" } };
export const WithIcons: Story = { args: { leadingIcon: "plus", trailingIcon: "arrow-right" } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Matrix: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      className="grid gap-strong p-strong"
      style={{ gridTemplateColumns: "repeat(5, max-content)" }}
    >
      {(["sm", "md", "lg"] as const).flatMap((size) =>
        (["neutral", "primary", "success", "danger", "inverse"] as const).map((variation) => (
          <div
            key={`${size}${variation}`}
            className={
              variation === "inverse" ? "bg-surface-neutral-very-strong p-subtle" : "p-subtle"
            }
          >
            <ButtonLink size={size} variation={variation}>
              {size} · {variation}
            </ButtonLink>
          </div>
        )),
      )}
    </div>
  ),
};
