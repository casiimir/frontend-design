import type { Meta, StoryObj } from "@storybook/react";
import type { DsTreeNode } from "@workspace/design-system";
import { DsSidebar } from "@workspace/design-system";
import { BookOpenIcon, FileTextIcon, FolderIcon } from "lucide-react";

const demoItems: DsTreeNode[] = [
  {
    id: "welcome",
    label: "Welcome: Data Analyst",
    icon: <FolderIcon className="size-3.5" />,
  },
  {
    id: "m0",
    label: "M0. Fundamentals",
    icon: <FolderIcon className="size-4" />,
    children: [
      {
        id: "lesson-intro",
        label: "Introduzione al mondo dei dati",
        icon: <BookOpenIcon className="size-4" />,
        status: "completed",
      },
      {
        id: "lesson-video",
        label: "Video",
        icon: <FolderIcon className="size-4" />,
        children: [
          {
            id: "lesson-dati-1",
            label: "1. Intro all'analisi dei dati (1)",
            icon: <FileTextIcon className="size-4" />,
            status: "in-progress",
          },
          {
            id: "lesson-dati-2",
            label: "2. Intro all'analisi dei dati (2)",
            icon: <FileTextIcon className="size-4" />,
            status: "new",
          },
          {
            id: "lesson-dati-3",
            label: "3. Analisi dati",
            icon: <FileTextIcon className="size-4" />,
          },
          {
            id: "lesson-dati-4",
            label: "4. Gestione dati",
            icon: <FileTextIcon className="size-4" />,
          },
        ],
      },
      {
        id: "lesson-theory",
        label: "Teoria",
        icon: <FolderIcon className="size-4" />,
        children: [
          {
            id: "lesson-dati-pdf",
            label: "Dati 1",
            icon: <FileTextIcon className="size-4" />,
          },
        ],
      },
    ],
  },
  {
    id: "m1",
    label: "Figure professionali & Open Data",
    icon: <FolderIcon className="size-4" />,
  },
  {
    id: "m2",
    label: "Business intelligence",
    icon: <FolderIcon className="size-4" />,
  },
  {
    id: "m3",
    label: "Excel",
    icon: <FolderIcon className="size-4" />,
  },
  {
    id: "m4",
    label: "Esame finale",
    icon: <FolderIcon className="size-4" />,
  },
  {
    id: "m5",
    label: "M1. Excel: febbraio 9 - marzo 13",
    icon: <FolderIcon className="size-4" />,
  },
  {
    id: "m6",
    label: "M2: marzo 16 - aprile 17",
    icon: <FolderIcon className="size-4" />,
  },
];

/**
 * `DsSidebar` is the branded wrapper around the UI sidebar primitive.
 * It supports collapsible behavior, recursive content trees and active item state.
 */
const meta: Meta<typeof DsSidebar> = {
  title: "Design System/DsSidebar",
  component: DsSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Use `DsSidebar` to render the LMS navigation tree. Provide `items`, `activeItemId` and optional `expandedItemIds` for deterministic state.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[700px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: { control: false },
    activeItemId: { control: "text" },
    expandedItemIds: { control: false },
    title: { control: "text" },
    side: { control: "inline-radio", options: ["left", "right"] },
    variant: {
      control: "inline-radio",
      options: ["sidebar", "floating", "inset"],
    },
    collapsible: {
      control: "inline-radio",
      options: ["offcanvas", "icon", "none"],
    },
    defaultOpen: { control: "boolean" },
    open: { control: "boolean" },
    onOpenChange: { action: "open-change" },
    onItemSelect: { action: "item-select" },
  },
  args: {
    items: demoItems,
    title: "Data Analytics & AI",
    expandedItemIds: ["m0", "lesson-video", "lesson-theory"],
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
    defaultOpen: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExpandedTree: Story = {
  args: {
    collapsible: "offcanvas",
  },
};

export const RightSide: Story = {
  args: {
    side: "right",
    collapsible: "offcanvas",
  },
};

export const Playground: Story = {};
