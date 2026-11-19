import { Tabs, TabsBase, TabsList, TabsPanel } from "@omn1/ui-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Figma: **Tabs** (235:1156) and its child **_TabsBase** (228:209), exported as `Tabs` / `TabsList` / `TabsBase` / `TabsPanel`. Arrow keys, Home and End move between tabs. Provisional — not yet verified against Figma (MCP access was unavailable). Variant matrix and sizes come from Figma; colours and motion are assumptions. See docs/FIGMA-SYNC.md.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const demo = (orientation: "horizontal" | "vertical") => (
  <Tabs defaultValue="overview" orientation={orientation}>
    <TabsList aria-label="Sections">
      <TabsBase value="overview" leadingIcon="house">
        Overview
      </TabsBase>
      <TabsBase value="activity">Activity</TabsBase>
      <TabsBase value="settings" leadingIcon="settings">
        Settings
      </TabsBase>
      <TabsBase value="archived" disabled>
        Archived
      </TabsBase>
    </TabsList>
    <TabsPanel value="overview" className="p-subtle font-sans text-body-md">
      Overview content
    </TabsPanel>
    <TabsPanel value="activity" className="p-subtle font-sans text-body-md">
      Activity content
    </TabsPanel>
    <TabsPanel value="settings" className="p-subtle font-sans text-body-md">
      Settings content
    </TabsPanel>
  </Tabs>
);

export const Horizontal: Story = { render: () => demo("horizontal") };
export const Vertical: Story = { render: () => demo("vertical") };
