import type { Meta, StoryObj } from "@storybook/react";
import {
  DsChatInput,
  type DsChatInputAttachment,
} from "@workspace/design-system";

const attachmentsPreview: DsChatInputAttachment[] = [
  { id: "a1", name: "lesson-notes.pdf", size: 248_000, type: "application/pdf" },
  { id: "a2", name: "dataset.csv", size: 82_340, type: "text/csv" },
];

/**
 * `DsChatInput` is the EPICODE chat composer used in the LMS right panel.
 * It supports message typing, send action and file attachments.
 */
const meta: Meta<typeof DsChatInput> = {
  title: "Design System/DsChatInput",
  component: DsChatInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsChatInput` for user message composition with optional attachments and branded EPICODE actions.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[560px] max-w-full rounded-xl border border-epicode-border bg-epicode-ink p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
      description: "Composer density",
    },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    sendLabel: { control: "text" },
    attachLabel: { control: "text" },
    allowAttachments: { control: "boolean" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    sending: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 8, step: 1 } },
    maxLength: { control: { type: "number", min: 10, max: 5000, step: 10 } },
    attachments: { control: false },
    value: { control: false },
    defaultValue: { control: "text" },
    onSend: { action: "sent" },
    onAttachmentsChange: { action: "attachmentsChanged" },
    onValueChange: { action: "valueChanged" },
  },
  args: {
    size: "md",
    placeholder: "Ask the assistant about this lesson...",
    helperText: "",
    sendLabel: "Send",
    attachLabel: "Attach",
    allowAttachments: true,
    multiple: true,
    disabled: false,
    sending: false,
    rows: 3,
    defaultValue: "",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    size: "sm",
    rows: 2,
  },
};

export const WithAttachments: Story = {
  args: {
    attachments: attachmentsPreview,
    helperText: "2 files attached",
  },
};

export const Sending: Story = {
  args: {
    defaultValue: "Please summarize this module in 3 bullet points.",
    sending: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Input is disabled for this state.",
    disabled: true,
  },
};

export const NoAttachments: Story = {
  args: {
    allowAttachments: false,
  },
};

export const Playground: Story = {};
