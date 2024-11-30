import { toSorted } from "../toSorted.js";

describe("the toSorted function", () => {
  it("sorts numbers naturally", () => {
    const input = [3, 1, 2];
    const expected = [1, 2, 3];

    expect(toSorted(input)).toEqual(expected);
    expect(Object.is(input, expected)).toBeFalsy();
  });

  it("sorts strings naturally", () => {
    const input = ["banana", "apple", "cherry"];
    const expected = ["apple", "banana", "cherry"];

    expect(toSorted(input)).toEqual(expected);
    expect(Object.is(input, expected)).toBeFalsy();
  });

  it("uses custom compare function for sorting", () => {
    const input = [3, 1, 2];

    const compareFunc = (a: number, b: number): number => b - a;

    const expected = [3, 2, 1];

    expect(toSorted(input, compareFunc)).toEqual(expected);
    expect(Object.is(input, expected)).toBeFalsy();
  });

  it("does not mutate the original array", () => {
    const input = [3, 1, 2];
    const copy = [...input];

    const result = toSorted(input);

    expect(input).toEqual(copy);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("handles an empty array", () => {
    const input: number[] = [];
    const expected: number[] = [];

    expect(toSorted(input)).toEqual(expected);
  });
});
