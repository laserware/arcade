import { appendToGroup } from "../appendToGroup.js";

describe.concurrent("the appendToGroup function", () => {
  it("adds a new entry to an object which doesn't contain the key", async () => {
    const input = {};

    const result = appendToGroup<unknown>(input, "test", 1);

    expect(result).toEqual({ test: [1] });
    expect(Object.is(input, result)).toBeTruthy();
  });

  it("adds a new entry to an object which does contain the key", async () => {
    const input = { test: [1] };

    const result = appendToGroup<number>(input, "test", 2);

    expect(result).toEqual({ test: [1, 2] });
    expect(Object.is(input, result)).toBeTruthy();
  });

  it("adds a new entry to an array which doesn't contain the index", async () => {
    const input: number[][] = [];

    let result = appendToGroup<unknown>(input, 0, 1);
    result = appendToGroup<unknown>(result, 3, 8);

    expect(result).toEqual([[1], undefined, undefined, [8]]);
  });

  it("adds a new entry to an array which does contain the index", async () => {
    const input: number[][] = [[1]];

    const result = appendToGroup<number>(input, 0, 2);

    expect(result).toEqual([[1, 2]]);
  });
});
