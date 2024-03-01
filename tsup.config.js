import { defineConfig } from "tsup";

export default defineConfig(() => {
  const commonOptions = {
    clean: true,
    entry: ["src/index.ts"],
    minify: false,
    sourcemap: true,
    tsconfig: "./tsconfig.build.json",
  };

  return [
    {
      ...commonOptions,
      dts: true,
      format: "esm",
      outExtension: () => ({ js: ".mjs" }),
    },
    {
      ...commonOptions,
      format: "cjs",
      outExtension: () => ({ js: ".cjs" }),
    },
  ];
});
