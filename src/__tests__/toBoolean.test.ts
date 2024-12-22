import { toBoolean } from "../toBoolean.js";

describe.concurrent("the toBoolean function", () => {
  it("returns true for boolean true", async () => {
    expect(toBoolean(true)).toBe(true);
  });

  it("returns false for boolean false", async () => {
    expect(toBoolean(false)).toBe(false);
  });

  it('returns true for string "true" (case insensitive)', () => {
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("TRUE")).toBe(true);
    expect(toBoolean("True")).toBe(true);
  });

  it('returns false for string "false" (case insensitive)', () => {
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("FALSE")).toBe(false);
    expect(toBoolean("False")).toBe(false);
  });

  it("returns true for non-zero numbers", async () => {
    expect(toBoolean(1)).toBe(true);
    expect(toBoolean(-1)).toBe(true);
    expect(toBoolean(123)).toBe(true);
  });

  it("returns false for zero", async () => {
    expect(toBoolean(0)).toBe(false);
  });

  it("returns false for null", async () => {
    expect(toBoolean(null)).toBe(false);
  });

  it("returns false for undefined", async () => {
    expect(toBoolean(undefined)).toBe(false);
  });

  it("returns false for invalid strings", async () => {
    expect(toBoolean("")).toBe(false);
    expect(toBoolean("random-string")).toBe(false);
    expect(toBoolean("0")).toBe(false);
  });
});
