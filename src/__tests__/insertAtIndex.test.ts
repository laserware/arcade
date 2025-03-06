import { describe, expect, it } from "bun:test";

import { insertAtIndex } from "../insertAtIndex.js";

describe("the insertAtIndex function", () => {
  it("adds the item at the specified index in the array", () => {
    const items = [1, 2, 3, 4];

    expect(insertAtIndex(items, 2, 3)).toEqual([1, 2, 3, 3, 4]);
  });

  it("returns the same array when an empty array is passed", () => {
    const items: number[] = [];

    expect(insertAtIndex(items, 0, [])).toEqual([]);
  });

  it("throws a RangeError when the index is out of bounds", () => {
    const items = [1, 2, 3];

    expect(() => {
      insertAtIndex(items, -1, 2);
    }).toThrow(RangeError);
  });

  it("handles insertion from the beginning of the array", () => {
    const items = [1, 2, 3];

    expect(insertAtIndex(items, 0, 0)).toEqual([0, 1, 2, 3]);
  });

  it("handles insertion from the end of the array", () => {
    const items = [1, 2, 3];

    expect(insertAtIndex(items, 2, 4)).toEqual([1, 2, 4, 3]);
  });

  it("handles a single-item array", () => {
    const items = [1];

    expect(insertAtIndex(items, 0, 1)).toEqual([1, 1]);
  });

  it("adds multiple items", () => {
    const items = [1, 2, 3];

    const result = insertAtIndex(items, 1, [4, 5]);

    expect(result).toEqual([1, 4, 5, 2, 3]);
  });
});
