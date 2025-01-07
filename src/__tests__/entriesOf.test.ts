import { describe, expect, it } from "bun:test";

import { entriesOf } from "../entriesOf.js";
import type { Dict } from "../types.js";

describe("the entriesOf function", () => {
  enum TestKey {
    A = "a",
    B = "b",
    C = "c",
  }

  it("returns an array of key-value pairs for a given object", async () => {
    const dict: Dict<number, TestKey> = {
      [TestKey.A]: 1,
      [TestKey.B]: 2,
      [TestKey.C]: 3,
    };

    const result = entriesOf<number, TestKey>(dict);
    expect(result).toEqual([
      [TestKey.A, 1],
      [TestKey.B, 2],
      [TestKey.C, 3],
    ]);
  });

  it("returns an empty array for an empty object", async () => {
    const emptyDict: Dict<number, TestKey> = {} as Dict<number, TestKey>;

    const result = entriesOf<number, TestKey>(emptyDict);
    expect(result).toEqual([]);
  });

  it("infers key type as string by default", async () => {
    const stringKeyedDict: Dict<number> = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = entriesOf<number>(stringKeyedDict);
    expect(result).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  // Example additional test considering string literals as keys:
  it("works correctly with string literal types as keys", async () => {
    type LiteralKey = "x" | "y" | "z";

    const literalDict: Dict<number, LiteralKey> = {
      x: 10,
      y: 20,
      z: 30,
    };

    const result = entriesOf<number, LiteralKey>(literalDict);
    expect(result).toEqual([
      ["x", 10],
      ["y", 20],
      ["z", 30],
    ]);
  });
});
