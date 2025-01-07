import { describe, expect, it } from "bun:test";

import { keysOf } from "../keysOf.js";

describe("the keysOf function", () => {
  it("returns the keys of an object", () => {
    const value = { a: 1, b: 2, c: 3 };

    const result = keysOf(value);

    expect(result).toEqual(["a", "b", "c"]);
  });
});
