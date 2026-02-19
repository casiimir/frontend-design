import type { Meta, StoryObj } from "@storybook/react";
import { DsButton } from "@workspace/design-system";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";

/**
 * `DsButton` is the EPICODE-branded wrapper over the UI primitive button.
 * It supports brand variants, loading state and start/end icon slots.
 */
const meta = {
  title: "Design System/DsButton",
  component: DsButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsButton` for all clickable actions in the EPICODE LMS. Variants and icon slots are design-system controlled.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button label",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      description: "EPICODE visual variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Button size",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    iconPosition: {
      control: "inline-radio",
      options: ["start", "end"],
      description: "Icon placement",
    },
    icon: {
      control: false,
      description: "Optional icon node",
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Continue lesson",
    variant: "primary",
    size: "default",
    loading: false,
    iconPosition: "start",
    disabled: false,
  },
} satisfies Meta<typeof DsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <BookOpenIcon className="size-4" />,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Saving...",
  },
};

export const WithEndIcon: Story = {
  args: {
    icon: <ArrowRightIcon className="size-4" />,
    iconPosition: "end",
  },
};

export const Playground: Story = {
  args: {
    children: "Try controls",
    variant: "primary",
    size: "default",
    loading: false,
    disabled: false,
    iconPosition: "start",
    icon: <BookOpenIcon className="size-4" />,
  },
};
