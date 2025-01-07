import { describe, expect, it } from "bun:test";

import { uniq } from "../uniq.js";

describe("the uniq function", () => {
  it("removes duplicates from an array of numbers", () => {
    const input = [1, 2, 3, 1, 2];
    const result = uniq(input);

    expect(result).toEqual([1, 2, 3]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("handles an array with no duplicates", () => {
    const input = [1, 2, 3];
    const result = uniq(input);

    expect(result).toEqual([1, 2, 3]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("returns an empty array when given an empty array", () => {
    const input: number[] = [];
    const result = uniq(input);

    expect(result).toEqual([]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("removes duplicates from an array of strings", () => {
    const input = ["a", "b", "a", "c"];
    const result = uniq(input);

    expect(result).toEqual(["a", "b", "c"]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("handles array of objects by reference equality", () => {
    const valueA = {};
    const valueB = {};

    const input = [valueA, valueA, valueB];
    const result = uniq(input);

    expect(result).toEqual([valueA, valueB]);
    expect(Object.is(input, result)).toBeFalsy();
  });
});
