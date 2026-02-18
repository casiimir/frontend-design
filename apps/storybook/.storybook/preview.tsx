import type { Preview } from "@storybook/react-vite";

import "@workspace/design-system/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-6 font-sans text-foreground antialiased">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "epicode-dark",
      values: [
        { name: "epicode-dark", value: "#111827" },
        { name: "epicode-light", value: "#f7f9fc" },
      ],
    },
    docs: {
      description: {
        component:
          "Global EPICODE theme decorator applies design tokens, fonts and base styles from `@workspace/design-system/globals.css`.",
      },
    },
  },
};

export default preview;
