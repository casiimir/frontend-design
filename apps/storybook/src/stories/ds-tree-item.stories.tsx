import type { Meta, StoryObj } from "@storybook/react";
import type { DsTreeNode } from "@workspace/design-system";
import { DsSidebar, DsTreeItem } from "@workspace/design-system";
import { FileTextIcon, FolderIcon } from "lucide-react";

const treeItem: DsTreeNode = {
  id: "module-1",
  label: "Introduzione al mondo dei dati",
  icon: <FolderIcon className="size-4" />,
  children: [
    {
      id: "lesson-1",
      label: "Dati 1",
      icon: <FileTextIcon className="size-4" />,
      status: "in-progress",
    },
  ],
};

/**
 * `DsTreeItem` is a recursive node for LMS content trees (module → lesson → sub-lesson).
 */
const meta: Meta<typeof DsTreeItem> = {
  title: "Design System/DsTreeItem",
  component: DsTreeItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Use `DsTreeItem` inside `DsSidebar` for recursive navigation trees with active and status states.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[420px] max-w-sm">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    item: { control: false },
    activeItemId: { control: "text" },
    expandedItemIds: { control: false },
    depth: { control: "number" },
    onItemSelect: { action: "item-select" },
  },
  args: {
    item: treeItem,
    activeItemId: "lesson-1",
    expandedItemIds: ["module-1"],
    depth: 0,
  },
  render: ({ item, activeItemId, expandedItemIds, onItemSelect }) => (
    <DsSidebar
      activeItemId={activeItemId}
      expandedItemIds={expandedItemIds}
      items={[item]}
      onItemSelect={onItemSelect}
      title="Tree Item Preview"
    />
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  args: {
    expandedItemIds: [],
  },
};

export const Playground: Story = {};
