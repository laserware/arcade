import { toNumber } from "../toNumber.js";

describe("the toNumber function", () => {
  it("returns the numeric equivalent for a valid number string", () => {
    expect(toNumber("123")).toBe(123);
  });

  it("returns the numeric equivalent for a number input", () => {
    expect(toNumber(123)).toBe(123);
  });

  it("returns the fallback if given value is undefined", () => {
    expect(toNumber(undefined)).toBe(0);
  });

  it("returns the fallback if given value is null", () => {
    expect(toNumber(null, 0)).toBe(0);
  });

  it("returns the fallback if given an empty string", () => {
    expect(toNumber("", 0)).toBe(0);
  });

  it("returns the fallback for a non-numeric string", () => {
    expect(toNumber("abc", 0)).toBe(0);
  });

  it("returns the numeric equivalent for a string with spaces around a number", () => {
    expect(toNumber(" 123 ", 0)).toBe(123);
  });

  it("returns the numeric equivalent for a boolean true", () => {
    expect(toNumber(true, 0)).toBe(1);
  });

  it("returns the numeric equivalent for a boolean false", () => {
    expect(toNumber(false, 0)).toBe(0);
  });

  it("returns the fallback for NaN input", () => {
    expect(toNumber(NaN, 0)).toBe(0);
  });
});
