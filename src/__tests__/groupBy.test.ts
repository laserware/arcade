import { describe, expect, it } from "bun:test";

import { groupBy } from "../groupBy.js";

describe("the groupBy function", () => {
  it("throws an error if the first argument is not a valid array", async () => {
    expect(() => {
      // @ts-expect-error
      groupBy("123", "length");
    }).toThrow(/expected an array/gi);
  });

  it("converts an array of items to an object with values grouped by property", async () => {
    const result = groupBy(["one", "two", "three"], "length");

    const expected = { "3": ["one", "two"], "5": ["three"] };

    expect(result).toEqual(expected);
  });

  it("converts an array of items to an object with values grouped by iteratee", async () => {
    const result = groupBy([6.1, 4.2, 6.3], Math.floor);

    const expected = { "4": [4.2], "6": [6.1, 6.3] };

    expect(result).toEqual(expected);
  });
});
