import { kebabCase } from "../kebabCase.js";

describe("the kebabCase function", () => {
  it.concurrent.each([
    {
      value: "TitleCase",
      expected: "title-case",
    },
    {
      value: "camelCase",
      expected: "camel-case",
    },
    {
      value: "space Separated",
      expected: "space-separated",
    },
  ])(
    "returns the correct value for a $value string",
    async ({ value, expected }) => {
      const result = kebabCase(value);

      expect(result).toBe(expected);
    },
  );
});
