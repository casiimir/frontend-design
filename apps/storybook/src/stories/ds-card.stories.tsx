import type { Meta, StoryObj } from "@storybook/react";
import { DsButton, DsCard } from "@workspace/design-system";
import { ArrowRightIcon } from "lucide-react";

/**
 * `DsCard` is the branded EPICODE lesson card wrapper over the primitive card.
 * It supports contextual header, footer, and an integrated progress indicator slot.
 */
const meta: Meta<typeof DsCard> = {
  title: "Design System/DsCard",
  component: DsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsCard` for lesson summaries and content blocks in the LMS. It supports built-in progress display or a custom progress slot.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px] max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["lesson", "default"],
      description: "Visual style variant",
    },
    title: { control: "text" },
    description: { control: "text" },
    children: { control: "text" },
    progressValue: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description:
        "Numeric progress percentage. Ignored if `progressSlot` is set.",
    },
    progressLabel: { control: "text" },
    action: { control: false },
    progressSlot: { control: false },
    footer: { control: false },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "lesson",
    title: "Introduzione al mondo dei dati",
    description: "Lezione video · 12 minuti",
    children:
      "Panoramica su dataset, metriche e visualizzazioni principali per il modulo M0.",
    progressLabel: "Lesson progress",
    progressValue: 36,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Lesson: Story = {
  args: {
    variant: "lesson",
    action: (
      <DsButton icon={<ArrowRightIcon className="size-4" />} size="sm">
        Open
      </DsButton>
    ),
  },
};

export const Plain: Story = {
  args: {
    variant: "default",
    progressValue: 64,
  },
};

export const CustomProgressSlot: Story = {
  args: {
    progressValue: undefined,
    progressSlot: (
      <div className="flex h-2 overflow-hidden rounded-full bg-epicode-muted">
        <span className="h-full w-3/4 bg-epicode-success" />
      </div>
    ),
  },
};

export const Playground: Story = {};
