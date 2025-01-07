import { describe, expect, it } from "bun:test";

import { isNil } from "../isNil.js";

describe("the isNil function", () => {
  it.each([
    {
      value: null,
      expected: true,
    },
    {
      value: undefined,
      expected: true,
    },
    {
      value: false,
      expected: false,
    },
    {
      value: "",
      expected: false,
    },
    {
      value: 0,
      expected: false,
    },
    {
      value: {},
      expected: false,
    },
    {
      value: [],
      expected: false,
    },
  ])("returns $expected when value is $value", async ({ value, expected }) => {
    const result = isNil(value);

    expect(result).toBe(expected);
  });
});
