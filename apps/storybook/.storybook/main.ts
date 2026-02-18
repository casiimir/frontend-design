import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const designSystemSrcPath = fileURLToPath(
  new URL("../../../packages/design-system/src/", import.meta.url)
);
const designSystemEntryPath = fileURLToPath(
  new URL("../../../packages/design-system/src/index.ts", import.meta.url)
);
const designSystemGlobalsPath = fileURLToPath(
  new URL(
    "../../../packages/design-system/src/styles/globals.css",
    import.meta.url
  )
);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: (config) => {
    const aliases = [
      {
        find: "@workspace/design-system/globals.css",
        replacement: designSystemGlobalsPath,
      },
      {
        find: "@workspace/design-system/",
        replacement: `${designSystemSrcPath}`,
      },
      {
        find: "@workspace/design-system",
        replacement: designSystemEntryPath,
      },
    ];

    const currentAliases = config.resolve?.alias;
    let normalizedAliases: Array<{
      find: string | RegExp;
      replacement: string;
    }> = [];

    if (Array.isArray(currentAliases)) {
      normalizedAliases = currentAliases as Array<{
        find: string | RegExp;
        replacement: string;
      }>;
    } else if (currentAliases) {
      normalizedAliases = Object.entries(currentAliases).map(
        ([find, replacement]) => ({
          find,
          replacement,
        })
      );
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [...normalizedAliases, ...aliases],
      },
    };
  },
};

export default config;
