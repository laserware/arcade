import { asNumber, toNumber } from "../toNumber.js";

describe("within toNumber", () => {
  describe("the asNumber function", () => {
    it("returns the numeric equivalent for a valid number string", () => {
      expect(asNumber("123")).toBe(123);
    });

    it("returns the numeric equivalent for a number input", () => {
      expect(asNumber(123)).toBe(123);
    });

    it("returns the fallback if given value is undefined", () => {
      expect(asNumber(undefined, 0)).toBe(0);
    });

    it("returns the fallback if given value is null", () => {
      expect(asNumber(null, 0)).toBe(0);
    });

    it("returns the fallback if given an empty string", () => {
      expect(asNumber("", 0)).toBe(0);
    });

    it("returns the fallback for a non-numeric string", () => {
      expect(asNumber("abc", 0)).toBe(0);
    });

    it("extracts numeric value from a string with non-numeric characters", () => {
      expect(asNumber("12px", 0)).toBe(12);
      expect(asNumber("$123", 0)).toBe(123);
    });

    it("returns the fallback for strings with only non-numeric characters", () => {
      expect(asNumber("Hello", 5)).toBe(5);
    });

    it("returns the numeric equivalent for a string with spaces around a number", () => {
      expect(asNumber(" 123 ", 0)).toBe(123);
    });

    it("returns the fallback when the numeric part of a string is NaN", () => {
      expect(asNumber("abc123abc", 0)).toBe(123);
      expect(asNumber("!!abc!!", 0)).toBe(0);
    });

    it("returns the fallback for unsupported input types", () => {
      expect(asNumber({ key: "value" }, 10)).toBe(10);
      expect(asNumber([1, 2, 3], 15)).toBe(15);
    });

    it("returns the fallback for NaN input", () => {
      expect(asNumber(NaN, 0)).toBe(0);
    });
  });

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
});
