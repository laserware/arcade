import { describe, expect, test } from "vitest";

import { removeFromDictionary } from "../removeFromDictionary.js";

describe("the removeFromDictionary function", () => {
  test("removes the specified key from the specified dictionary", () => {
    const input = { a: "1", b: "2" };

    const result = removeFromDictionary(input, "a");

    expect(result).toEqual({ b: "2" });
    expect(Object.is(input, result)).toBeFalsy();
  });

  test("returns the input if the specified key isn't in the specified dictionary", () => {
    const input = { a: "1", b: "2" };

    const result = removeFromDictionary(input, "c");

    expect(result).toEqual({ a: "1", b: "2" });
    expect(Object.is(input, result)).toBeFalsy();
  });
});
