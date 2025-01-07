import { describe, expect, it } from "bun:test";

import { sumBy } from "../sumBy.js";

describe("the sumBy function", () => {
  it("returns 0 for an empty collection", async () => {
    const result = sumBy([], "value");
    expect(result).toBe(0);
  });

  it("throws an error if field does not exist", async () => {
    const collection = [{ value: 1 }, { value: 2 }];

    expect(() => {
      sumBy(collection, "nonExistingField");
    }).toThrow(/does not exist/);
  });

  it("throws an error if field value is not a number", async () => {
    const collection = [{ value: 1 }, { value: "not-a-number" }];

    expect(() => {
      sumBy(collection, "value");
    }).toThrow(/not a valid number/);
  });

  it("correctly sums the values of a given field", async () => {
    const collection = [{ value: 1 }, { value: 2 }, { value: 3 }];

    const result = sumBy(collection, "value");

    expect(result).toBe(6);
  });

  it("handles large numbers accurately", async () => {
    const collection = [{ value: 1_000_000 }, { value: 2_000_000 }];

    const result = sumBy(collection, "value");

    expect(result).toBe(3_000_000);
  });
});
