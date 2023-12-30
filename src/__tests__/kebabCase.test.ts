import { describe, expect, test } from "vitest";

import { kebabCase } from "../kebabCase.js";

describe("the kebabCase function", () => {
  const testCases = [
    {
      name: "returns the correct value for a TitleCase string",
      value: "TitleCase",
      expected: "title-case",
    },
    {
      name: "returns the correct value for a camelCase string",
      value: "camelCase",
      expected: "camel-case",
    },
    {
      name: "returns the correct value for a space Separated string",
      value: "space Separated",
      expected: "space-separated",
    },
  ];

  for (const testCase of testCases) {
    test.concurrent(testCase.name, async () => {
      const result = kebabCase(testCase.value);

      expect(result).toBe(testCase.expected);
    });
  }
});
