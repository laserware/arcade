import { describe, expect, it } from "bun:test";

import { omit } from "../omit.js";

describe("the omit function", () => {
  it("removes the specified key from the specified object", async () => {
    const input = { a: "1", b: "2" };

    const result = omit(input, "a");

    expect(result).toEqual({ b: "2" } as any);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("returns the input if the specified key isn't in the specified object", async () => {
    const input = { a: "1", b: "2" };

    const result = omit(input, "c");

    expect(result).toEqual({ a: "1", b: "2" });
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("removes the specified keys from the specified object", async () => {
    const input = { a: "1", b: "2", c: "3" };

    const result = omit(input, ["a", "b"]);

    expect(result).toEqual({ c: "3" } as any);
    expect(Object.is(input, result)).toBeFalsy();
  });

  it("returns the input if the specified keys aren't in the specified object", async () => {
    const input = { a: "1", b: "2" };

    const result = omit(input, ["c", "d"]);

    expect(result).toEqual({ a: "1", b: "2" });
    expect(Object.is(input, result)).toBeFalsy();
  });
});
