import type { Meta, StoryObj } from "@storybook/react";
import { DsInput } from "@workspace/design-system";

/**
 * `DsInput` is the EPICODE-branded input wrapper over the primitive input.
 * It adds branded focus treatment, helper text and error messaging.
 */
const meta: Meta<typeof DsInput> = {
  title: "Design System/DsInput",
  component: DsInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsInput` for branded data entry fields with optional helper text and validation feedback.",
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
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    state: {
      control: "inline-radio",
      options: ["default", "error"],
    },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: "inline-radio",
      options: ["text", "email", "password", "search", "url"],
    },
    defaultValue: { control: "text" },
    containerClassName: { control: false },
    onChange: { action: "changed" },
  },
  args: {
    label: "Email",
    placeholder: "name@epicode.com",
    helperText: "Use your EPICODE account email",
    error: "",
    state: "default",
    invalid: false,
    disabled: false,
    type: "email",
    defaultValue: "",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "Your email will be used for account recovery.",
  },
};

export const ErrorState: Story = {
  args: {
    error: "Please enter a valid email address.",
    helperText: "Required field",
    state: "error",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "student@epicode.com",
    helperText: "This field is locked",
  },
};

export const Playground: Story = {};
