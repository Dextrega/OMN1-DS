import { TextInput, iconNames } from "@omn1/ui-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: { label: "Label", placeholder: "Placeholder", helper: "Helper text", appearance: "full" },
  argTypes: {
    appearance: { control: "inline-radio", options: ["full", "compact"] },
    leadingIcon: { control: "select", options: [undefined, ...iconNames] },
    trailingIcon: { control: "select", options: [undefined, ...iconNames] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 312 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Figma: **TextInput** (6:9944), 312 wide. Enabled geometry and tokens are verified; per-state stroke colours and the Compact layout are provisional.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Filled: Story = { args: { defaultValue: "hello@omn1.design", leadingIcon: "mail" } };
export const Required: Story = { args: { required: true, hint: "required" } };
export const WithCounter: Story = {
  args: { counter: true, maxLength: 80, defaultValue: "Short bio" },
};
export const WithAffixes: Story = { args: { prefix: "R$", suffix: "BRL", defaultValue: "120,00" } };
export const Loading: Story = { args: { loading: true, defaultValue: "Checking…" } };
export const ErrorState: Story = {
  name: "Error",
  args: { error: "Enter a valid email", defaultValue: "nope" },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked" } };
export const Compact: Story = {
  args: { appearance: "compact", leadingIcon: "search", placeholder: "Search" },
};
