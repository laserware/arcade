import { describe, expect, test } from "vitest";

import { isNil } from "../isNil";

describe("the isNil function", () => {
  const testCases = [
    {
      name: "returns true if the value is null",
      value: null,
      expected: true,
    },
    {
      name: "returns true if the value is undefined",
      value: undefined,
      expected: true,
    },
    {
      name: "returns false if the value is false",
      value: false,
      expected: false,
    },
    {
      name: "returns false if the value is an empty string",
      value: "",
      expected: false,
    },
    {
      name: "returns false if the value is 0",
      value: 0,
      expected: false,
    },
    {
      name: "returns false if the value is an empty object",
      value: {},
      expected: false,
    },
    {
      name: "returns false if the value is an empty array",
      value: [],
      expected: false,
    },
  ];

  for (const testCase of testCases) {
    test.concurrent(testCase.name, async () => {
      const result = isNil(testCase.value);

      expect(result).toBe(testCase.expected);
    });
  }
});
