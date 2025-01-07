import { describe, expect, it } from "bun:test";

import { isPlainObject } from "../isPlainObject.js";
import { noop } from "../noop.js";

describe("the isPlainObject function", () => {
  it("returns true for plain object", () => {
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true);
  });

  it("returns false for array", () => {
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it("returns false for null", () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  it("returns false for number", () => {
    expect(isPlainObject(123)).toBe(false);
  });

  it("returns false for string", () => {
    expect(isPlainObject("string")).toBe(false);
  });

  it("returns false for boolean", () => {
    expect(isPlainObject(true)).toBe(false);
  });

  it("returns false for function", () => {
    expect(isPlainObject(noop)).toBe(false);
  });

  it("returns false for instance of a class", () => {
    class MyClass {}

    const instance = new MyClass();

    expect(isPlainObject(instance)).toBe(false);
  });
});
