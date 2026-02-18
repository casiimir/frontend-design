import type { Meta, StoryObj } from "@storybook/react";
import { DsAvatar } from "@workspace/design-system";

/**
 * `DsAvatar` is the EPICODE-branded wrapper over the primitive avatar.
 * It adds branded fallback styling and online presence indicator.
 */
const meta: Meta<typeof DsAvatar> = {
  title: "Design System/DsAvatar",
  component: DsAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsAvatar` for learners, mentors and assistants. It supports branded fallback initials and status presence.",
      },
    },
  },
  argTypes: {
    name: { control: "text" },
    alt: { control: "text" },
    src: { control: "text" },
    fallback: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "default", "lg"],
    },
    status: {
      control: "inline-radio",
      options: ["online", "away", "offline"],
    },
    showStatus: { control: "boolean" },
  },
  args: {
    name: "Data Analyst",
    alt: "Data Analyst avatar",
    src: "",
    fallback: "",
    size: "default",
    status: "online",
    showStatus: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Online: Story = {
  args: {
    status: "online",
    name: "Student One",
  },
};

export const Away: Story = {
  args: {
    status: "away",
    name: "Mentor",
  },
};

export const Offline: Story = {
  args: {
    status: "offline",
    name: "Assistant",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    name: "Giulia Bianchi",
    alt: "Giulia Bianchi",
  },
};

export const Playground: Story = {};
