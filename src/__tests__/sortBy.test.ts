import { describe, expect, it } from "bun:test";

import { sortBy } from "../sortBy.js";

describe("the sortBy function", () => {
  it("sorts array of objects by a string field", async () => {
    const data = [
      { name: "Zebra", age: 5 },
      { name: "Apple", age: 10 },
      { name: "Mango", age: 1 },
    ];

    const result = sortBy(data, "name");

    expect(result).toEqual([
      { name: "Apple", age: 10 },
      { name: "Mango", age: 1 },
      { name: "Zebra", age: 5 },
    ]);
  });

  it("sorts array of objects by a number field", async () => {
    const data = [
      { name: "Cat", age: 9 },
      { name: "Dog", age: 5 },
      { name: "Bird", age: 2 },
    ];

    const result = sortBy(data, "age");

    expect(result).toEqual([
      { name: "Bird", age: 2 },
      { name: "Dog", age: 5 },
      { name: "Cat", age: 9 },
    ]);
  });

  it("returns the same array if array length is less than 2", async () => {
    const data = [{ name: "OnlyOne", age: 1 }];

    const result = sortBy(data, "name");

    expect(result).toEqual([{ name: "OnlyOne", age: 1 }]);
  });

  it("handles an array with no elements", async () => {
    const data: { name: string; age: number }[] = [];

    const result = sortBy(data, "name");

    expect(result).toEqual([]);
  });
});
