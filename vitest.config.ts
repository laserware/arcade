import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["lcov"],
      exclude: [
        "**/__fakes__/**",
        "**/__mocks__/**",
        "**/__tests__/**",
        "**/__e2e__/**",
        "**/*.json",
        "**/*.js",
      ],
    },
  },
});
