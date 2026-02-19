import type { Meta, StoryObj } from "@storybook/react";
import {
  DsButton,
  DsDialog,
  DsDialogBody,
  DsDialogContent,
  DsDialogDescription,
  DsDialogFooter,
  DsDialogHeader,
  DsDialogTitle,
  DsDialogTrigger,
} from "@workspace/design-system";

/**
 * `DsDialog` is the EPICODE-branded wrapper over dialog primitives.
 * It provides a branded header bar and consistent content spacing.
 */
const meta: Meta<typeof DsDialogContent> = {
  title: "Design System/DsDialog",
  component: DsDialogContent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsDialog` for confirmations and contextual actions. It applies EPICODE visual style through branded header and spacing wrappers.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[520px] max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Dialog content size",
    },
    showCloseButton: {
      control: "boolean",
      description: "Shows close button in the top-right corner",
    },
    className: { control: false },
    children: { control: false },
  },
  args: {
    size: "md",
    showCloseButton: true,
  },
  render: (args) => (
    <DsDialog>
      <DsDialogTrigger asChild>
        <DsButton>Open Dialog</DsButton>
      </DsDialogTrigger>
      <DsDialogContent showCloseButton={args.showCloseButton} size={args.size}>
        <DsDialogHeader>
          <DsDialogTitle>Lesson details</DsDialogTitle>
          <DsDialogDescription>
            Review this information before starting the next module.
          </DsDialogDescription>
        </DsDialogHeader>
        <DsDialogBody>
          This lesson includes a short quiz and downloadable resources.
        </DsDialogBody>
        <DsDialogFooter>
          <DsButton variant="secondary">Cancel</DsButton>
          <DsButton>Continue</DsButton>
        </DsDialogFooter>
      </DsDialogContent>
    </DsDialog>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Triggered: Story = {
  render: (args) => (
    <DsDialog>
      <DsDialogTrigger asChild>
        <DsButton>Open Triggered Dialog</DsButton>
      </DsDialogTrigger>
      <DsDialogContent showCloseButton={args.showCloseButton} size={args.size}>
        <DsDialogHeader>
          <DsDialogTitle>Triggered dialog</DsDialogTitle>
          <DsDialogDescription>
            This variant opens from a trigger button.
          </DsDialogDescription>
        </DsDialogHeader>
        <DsDialogBody>
          Perfect for contextual actions that do not need immediate opening.
        </DsDialogBody>
      </DsDialogContent>
    </DsDialog>
  ),
};

export const Playground: Story = {};
