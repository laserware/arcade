import { fileURLToPath } from "node:url";

import { filePatterns, getBaseConfigs } from "@laserware/eslint-config/base";

const rootDirPath = fileURLToPath(new URL(".", import.meta.url));

const baseConfigs = getBaseConfigs({
  tsConfigRootDir: rootDirPath,
  tsConfigFiles: ["./tsconfig.json", "./tsconfig.node.json"],
});

export default [
  ...baseConfigs,
  {
    files: filePatterns.typescript,
    rules: {
      "import/extensions": "off",
      "max-params": ["error", 4],
    },
  },
  {
    files: filePatterns.tests,
    rules: {
      "vitest/prefer-to-be-falsy": "off",
      "vitest/prefer-to-be-truthy": "off",
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
];
