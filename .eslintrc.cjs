require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["@laserware/eslint-config"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  ignorePatterns: ["*.js"],
  overrides: [
    {
      files: ["./*.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ]
};
