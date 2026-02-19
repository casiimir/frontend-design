import type { Meta, StoryObj } from "@storybook/react";
import { DsAvatar, DsChatBubble } from "@workspace/design-system";

/**
 * `DsChatBubble` is the EPICODE chat message bubble for LMS assistant conversations.
 * It supports `user` and `assistant` message variants with optional avatar and timestamp.
 */
const meta: Meta<typeof DsChatBubble> = {
  title: "Design System/DsChatBubble",
  component: DsChatBubble,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use `DsChatBubble` in the right-side chat panel to render user and assistant messages with consistent EPICODE styling.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[520px] max-w-full space-y-3 rounded-xl border border-epicode-border bg-epicode-ink p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["assistant", "user"],
      description: "Message alignment/style variant",
    },
    message: { control: "text" },
    timestamp: { control: "text" },
    avatar: { control: false },
    className: { control: false },
  },
  args: {
    variant: "assistant",
    message: "Ciao! Posso aiutarti con il riepilogo della lezione corrente.",
    timestamp: "10:42",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Assistant: Story = {
  args: {
    variant: "assistant",
    avatar: <DsAvatar fallback="AI" showStatus={false} size="sm" />,
    message: "Ho analizzato il contenuto: vuoi un quiz veloce di 3 domande?",
  },
};

export const User: Story = {
  args: {
    variant: "user",
    avatar: <DsAvatar fallback="MR" showStatus={false} size="sm" />,
    message: "Sì, iniziamo dal recap sui KPI principali.",
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="space-y-2">
      <DsChatBubble
        avatar={<DsAvatar fallback="AI" showStatus={false} size="sm" />}
        message="Benvenuto! Vuoi ripassare la lezione Dati 1?"
        timestamp="10:40"
        variant="assistant"
      />
      <DsChatBubble
        avatar={<DsAvatar fallback="MR" showStatus={false} size="sm" />}
        message="Sì, concentrati su metriche e dashboard."
        timestamp="10:41"
        variant="user"
      />
      <DsChatBubble
        avatar={<DsAvatar fallback="AI" showStatus={false} size="sm" />}
        message="Perfetto. Le 3 metriche chiave sono: conversion rate, retention e churn."
        timestamp="10:42"
        variant="assistant"
      />
    </div>
  ),
};

export const Playground: Story = {};
