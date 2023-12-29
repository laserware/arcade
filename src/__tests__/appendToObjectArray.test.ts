import { describe, expect, test } from "vitest";

import { appendToObjectArray } from "../appendToObjectArray";

describe("the appendToObjectArray function", () => {
  test("adds a new entry to an object which doesn't contain the key", () => {
    const input = {};

    const result = appendToObjectArray<unknown>(input, "test", 1);

    expect(result).toEqual({ test: [1] });
    expect(Object.is(input, result)).toBeFalsy();
  });

  test("adds a new entry to an object which doesn't contain the key", () => {
    const input = { test: [1] };

    const result = appendToObjectArray<number>(input, "test", 2);

    expect(result).toEqual({ test: [1, 2] });
    expect(Object.is(input, result)).toBeFalsy();
  });
});
