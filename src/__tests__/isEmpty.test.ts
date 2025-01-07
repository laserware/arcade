import { describe, expect, it } from "bun:test";

import { isEmpty } from "../isEmpty.js";

describe("the isEmpty function", () => {
  it.each([
    { value: null, expected: true },
    { value: undefined, expected: true },
    { value: "", expected: true },
    { value: "test", expected: false },
    { value: [], expected: true },
    { value: [1, 2, 3], expected: false },
    { value: {}, expected: true },
    { value: { key: "value" }, expected: false },
    { value: new Map(), expected: true },
    { value: new Map([["key", "value"]]), expected: false },
    { value: new Set(), expected: true },
    { value: new Set(["value"]), expected: false },
  ])("returns $expected when value is $value", async ({ value, expected }) => {
    expect(isEmpty(value)).toBe(expected);
  });
});
