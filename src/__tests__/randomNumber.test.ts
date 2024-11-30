import { randomNumber } from "../randomNumber.js";

describe("the randomNumber function", () => {
  it("returns a number greater than or equal to the minimum value", () => {
    const [min, max] = [1, 10];

    expect(randomNumber(min, max)).toBeGreaterThanOrEqual(min);
  });

  it("returns a number less than or equal to the maximum value", () => {
    const [min, max] = [1, 10];

    expect(randomNumber(min, max)).toBeLessThanOrEqual(max);
  });

  it("returns the minimum value when min and max are the same", () => {
    const [min, max] = [5, 5];

    expect(randomNumber(min, max)).toBe(min);
  });

  it("returns a different number for multiple calls with the same min and max", () => {
    const [min, max] = [1, 500];

    expect(randomNumber(min, max)).not.toBe(randomNumber(min, max));
  });
});
