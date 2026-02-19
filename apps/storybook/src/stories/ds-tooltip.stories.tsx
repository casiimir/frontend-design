import type { Meta, StoryObj } from "@storybook/react";
import {
  DsButton,
  DsTooltip,
  DsTooltipContent,
  DsTooltipProvider,
  DsTooltipTrigger,
} from "@workspace/design-system";

/**
 * `DsTooltip` is the EPICODE-branded tooltip wrapper.
 * It provides branded colors for contextual hints and micro-guidance.
 */
const meta: Meta<typeof DsTooltipContent> = {
  title: "Design System/DsTooltip",
  component: DsTooltipContent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsTooltip` for short contextual hints on actions and controls in the LMS.",
      },
    },
  },
  argTypes: {
    children: { control: "text", description: "Tooltip content" },
    tone: {
      control: "inline-radio",
      options: ["neutral", "brand", "inverse"],
      description: "Visual tone",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
      description: "Tooltip size",
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip position side",
    },
    sideOffset: {
      control: { type: "number", min: 0, max: 24, step: 1 },
      description: "Offset from trigger",
    },
    className: { control: false },
  },
  args: {
    children: "Open lesson details",
    tone: "neutral",
    size: "md",
    side: "top",
    sideOffset: 8,
  },
  render: ({ children, ...args }) => (
    <DsTooltipProvider>
      <DsTooltip>
        <DsTooltipTrigger asChild>
          <DsButton variant="secondary">Hover me</DsButton>
        </DsTooltipTrigger>
        <DsTooltipContent {...args}>{children}</DsTooltipContent>
      </DsTooltip>
    </DsTooltipProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Brand: Story = {
  args: {
    tone: "brand",
    children: "Continue to next lesson",
  },
};

export const Inverse: Story = {
  args: {
    tone: "inverse",
    children: "Locked content",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Quick hint",
  },
};

export const Playground: Story = {};
