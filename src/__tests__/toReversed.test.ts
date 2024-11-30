import { toReversed } from "../toReversed.js";

describe.concurrent("the toReversed function", () => {
  it("reverses a non-empty array of numbers", async () => {
    const input = [1, 2, 3, 4, 5];
    const result = toReversed(input);

    expect(result).toEqual([5, 4, 3, 2, 1]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("reverses a non-empty array of strings", async () => {
    const input = ["a", "b", "c", "d"];
    const result = toReversed(input);

    expect(result).toEqual(["d", "c", "b", "a"]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("returns an empty array when input is an empty array", async () => {
    const input: number[] = [];
    const result = toReversed(input);

    expect(result).toEqual([]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("reverses an array with one item to itself", async () => {
    const input = [42];
    const result = toReversed(input);

    expect(result).toEqual([42]);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("creates a reversed array without modifying the original array", async () => {
    const values = [1, 2, 3];
    const valuesCopy = [...values];

    toReversed(values);

    expect(values).toEqual(valuesCopy);
    expect(Object.is(values, valuesCopy)).toBeFalsy();
  });
});
