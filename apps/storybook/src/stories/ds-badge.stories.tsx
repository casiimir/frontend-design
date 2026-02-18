import type { Meta, StoryObj } from "@storybook/react";
import { DsBadge } from "@workspace/design-system";

/**
 * `DsBadge` is the EPICODE status badge wrapper over the primitive badge.
 * Use it to represent lesson lifecycle states in the LMS.
 */
const meta: Meta<typeof DsBadge> = {
  title: "Design System/DsBadge",
  component: DsBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsBadge` for lesson and module states (`completed`, `in-progress`, `locked`, `new`) with EPICODE styling.",
      },
    },
  },
  argTypes: {
    status: {
      control: "inline-radio",
      options: ["completed", "in-progress", "locked", "new"],
      description: "Status semantic variant",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
      description: "Badge size",
    },
    children: {
      control: "text",
      description: "Optional custom label. If omitted, status label is used.",
    },
  },
  args: {
    status: "in-progress",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    status: "completed",
  },
};

export const InProgress: Story = {
  args: {
    status: "in-progress",
  },
};

export const Locked: Story = {
  args: {
    status: "locked",
  },
};

export const New: Story = {
  args: {
    status: "new",
  },
};

export const Playground: Story = {};
