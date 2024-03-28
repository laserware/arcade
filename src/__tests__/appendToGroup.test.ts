import { appendToGroup } from "../appendToGroup.js";

describe("the appendToGroup function", () => {
  it("adds a new entry to an object which doesn't contain the key", () => {
    const input = {};

    const result = appendToGroup<unknown>(input, "test", 1);

    expect(result).toEqual({ test: [1] });
    expect(Object.is(input, result)).toBeTruthy();
  });

  it("adds a new entry to an object which does contain the key", () => {
    const input = { test: [1] };

    const result = appendToGroup<number>(input, "test", 2);

    expect(result).toEqual({ test: [1, 2] });
    expect(Object.is(input, result)).toBeTruthy();
  });
});
