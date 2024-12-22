import { gte } from "../gte.js";

describe.concurrent("the gte function", () => {
  it("returns true when both numbers are equal", async () => {
    expect(gte(5, 5)).toBe(true);
  });

  it("returns false when first number is less than the second number", async () => {
    expect(gte(3, 5)).toBe(false);
  });

  it("returns true when first number is greater than the second number", async () => {
    expect(gte(7, 5)).toBe(true);
  });

  it("returns true when string numbers are equal", async () => {
    expect(gte("8", "8")).toBe(true);
  });

  it("returns true when first string number is greater", async () => {
    expect(gte("10", "9")).toBe(true);
  });

  it("returns false when first string number is less", async () => {
    expect(gte("4", "9")).toBe(false);
  });

  it("returns true when number and equivalent string number are compared", async () => {
    expect(gte(5, "5")).toBe(true);
    expect(gte("5", 5)).toBe(true);
  });
});
