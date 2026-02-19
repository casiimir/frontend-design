import type { Meta, StoryObj } from "@storybook/react";
import { DsProgress } from "@workspace/design-system";

/**
 * `DsProgress` is the EPICODE-branded progress wrapper over the primitive progress.
 * It supports labels, percentage text and color tones.
 */
const meta: Meta<typeof DsProgress> = {
  title: "Design System/DsProgress",
  component: DsProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsProgress` for lesson and module completion indicators in the LMS.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: "number", min: 1, max: 1000, step: 1 },
    },
    label: { control: "text" },
    helperText: { control: "text" },
    showPercentage: { control: "boolean" },
    valueText: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: "inline-radio",
      options: ["brand", "success", "warning", "danger"],
    },
  },
  args: {
    label: "Lesson progress",
    helperText: "3 of 8 lessons completed",
    value: 38,
    max: 100,
    showPercentage: true,
    size: "md",
    tone: "brand",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    tone: "success",
    value: 76,
    helperText: "On track",
  },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    value: 42,
    helperText: "Keep going",
  },
};

export const Danger: Story = {
  args: {
    tone: "danger",
    value: 18,
    helperText: "Behind schedule",
  },
};

export const Playground: Story = {};
