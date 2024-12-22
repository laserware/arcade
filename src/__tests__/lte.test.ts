import { lte } from "../lte.js";

describe.concurrent("the lte function", () => {
  it("returns true when first number is less than the second number", async () => {
    expect(lte(3, 5)).toBe(true);
  });

  it("returns true when first number is equal to the second number", async () => {
    expect(lte(5, 5)).toBe(true);
  });

  it("returns false when first number is greater than the second number", async () => {
    expect(lte(7, 5)).toBe(false);
  });

  it("returns true when first string number is less than the second string number", async () => {
    expect(lte("3", "5")).toBe(true);
  });

  it("returns true when first string number is equal to the second string number", async () => {
    expect(lte("5", "5")).toBe(true);
  });

  it("returns false when first string number is greater than the second string number", async () => {
    expect(lte("7", "5")).toBe(false);
  });

  it("returns true for mixed inputs when first is less than the second", async () => {
    expect(lte("3", 5)).toBe(true);
  });

  it("returns true for mixed inputs when first is equal to the second", async () => {
    expect(lte(5, "5")).toBe(true);
  });

  it("returns false for mixed inputs when first is greater than the second", async () => {
    expect(lte(7, "5")).toBe(false);
  });
});
