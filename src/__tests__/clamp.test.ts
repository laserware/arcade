import { clamp } from "../clamp.js";

describe("the clamp function", () => {
  it.concurrent.each([
    { value: 4, upper: 10, lower: -1, expected: 4 },
    { value: 100, upper: 10, lower: -1, expected: 10 },
    { value: -50, upper: 10, lower: -1, expected: -1 },
    { value: NaN, upper: 10, lower: -1, expected: NaN },
    { value: Infinity, upper: 10, lower: -1, expected: 10 },
    { value: -Infinity, upper: 10, lower: -1, expected: -1 },
    { value: "100", upper: 10, lower: -1, expected: 10 },
    { value: true, upper: 10, lower: -1, expected: 1 },
    { value: false, upper: 10, lower: -1, expected: 0 },
  ])(
    "returns $expected for $value when upper is $upper and lower is $lower",
    async ({ value, upper, lower, expected }) => {
      // @ts-ignore
      const result = clamp(value, lower, upper);

      expect(result).toBe(expected);
    },
  );
});
