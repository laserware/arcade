import { describe, expect, test } from "vitest";

import { arrayToDictionary } from "../arrayToDictionary.js";

describe("the arrayToDictionary function", () => {
  test("converts an array of objects to an object keyed by the specified field", () => {
    const input = [
      { id: "a", value: "A" },
      { id: "b", value: "B" },
    ];
    const result = arrayToDictionary(input, "id");

    const expected = {
      a: { id: "a", value: "A" },
      b: { id: "b", value: "B" },
    };

    expect(result).toEqual(expected);
  });

  test("throws an error if the key field is invalid", () => {
    const input = [
      { id: "a", value: "A" },
      { id: "b", value: "B" },
    ];

    expect(() => {
      arrayToDictionary(input, "invalid");
    }).toThrowError(/unable to convert/gi);
  });
});
