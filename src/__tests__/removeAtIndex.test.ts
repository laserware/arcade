import { removeAtIndex } from "../removeAtIndex.js";

describe.concurrent("the removeAtIndex function", () => {
  it("removes the item at the specified index from the array", async () => {
    const items = [1, 2, 3, 4];

    expect(removeAtIndex(items, 2)).toEqual([1, 2, 4]);
  });

  it("returns the same array when an empty array is passed", async () => {
    const items: number[] = [];

    expect(removeAtIndex(items, 0)).toEqual([]);
  });

  it("throws a RangeError when the index is out of bounds", async () => {
    const items = [1, 2, 3];

    expect(() => {
      removeAtIndex(items, -1);
    }).toThrow(RangeError);
  });

  it("handles removal from the beginning of the array", async () => {
    const items = [1, 2, 3];

    expect(removeAtIndex(items, 0)).toEqual([2, 3]);
  });

  it("handles removal from the end of the array", async () => {
    const items = [1, 2, 3];

    expect(removeAtIndex(items, 2)).toEqual([1, 2]);
  });

  it("handles a single-item array", async () => {
    const items = [1];

    expect(removeAtIndex(items, 0)).toEqual([]);
  });
});
