import { describe, expect, it } from "bun:test";

import { isNotNil } from "../isNotNil.js";

describe("the isNotNil function", () => {
  it.each([
    {
      value: null,
      expected: false,
    },
    {
      value: undefined,
      expected: false,
    },
    {
      value: false,
      expected: true,
    },
    {
      value: "",
      expected: true,
    },
    {
      value: 0,
      expected: true,
    },
    {
      value: {},
      expected: true,
    },
    {
      value: [],
      expected: true,
    },
  ])("returns $expected when value is $value", async ({ value, expected }) => {
    const result = isNotNil(value);

    expect(result).toBe(expected);
  });
});
