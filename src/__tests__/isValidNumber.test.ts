import { isValidNumber } from "../isValidNumber.js";

describe.concurrent("the isValidNumber function", () => {
  it("returns true when a valid number is provided", async () => {
    expect(isValidNumber(100)).toBe(true);
  });

  it("returns false when a string is provided", async () => {
    expect(isValidNumber("100")).toBe(false);
  });

  it("returns false when NaN is provided", async () => {
    expect(isValidNumber(Number.NaN)).toBe(false);
  });

  it("returns false when an object is provided", async () => {
    expect(isValidNumber({})).toBe(false);
  });

  it("returns false when null is provided", async () => {
    expect(isValidNumber(null)).toBe(false);
  });

  it("returns false when undefined is provided", async () => {
    expect(isValidNumber(undefined)).toBe(false);
  });
});
