import { config as baseConfig } from "@workspace/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    rules: {
      "performance/noBarrelFile": "off",
    },
  },
];
