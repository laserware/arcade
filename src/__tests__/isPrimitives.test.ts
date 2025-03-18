// noinspection JSPrimitiveTypeWrapperUsage

import { describe, expect, it } from "bun:test";

import {
  isArrayOf,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isObjectLiteral,
  isString,
  isValidNumber,
} from "../isPrimitives.js";

describe("within isPrimitives", () => {
  describe("the isArrayOf function", () => {
    it.each([
      [["a", "b", "c"], true, isString],
      [[1, 2, 3], true, isNumber],
      [[1, "b", 3], false, isNumber],
      [[], false, undefined],
      [[], true, isString],
      ["not an array", false, isString],
      [[{ a: 1 }, { b: 2 }], false, isString],
    ])("with input %p returns %p", (input, expected, predicate) => {
      expect(isArrayOf(input, predicate!)).toBe(expected);
    });
  });

  describe("the isBoolean function", () => {
    it.each([
      [true, true],
      [false, true],
      ["true", false],
      [1, false],
      [{}, false],
      [null, false],
      [undefined, false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isBoolean(input)).toBe(expected);
    });
  });

  describe("the isFunction function", () => {
    it.each([
      [() => {}, true],
      [() => {}, true],
      [async () => {}, true],
      [Math.max, true],
      [class TestClass {}, true],
      [{}, false],
      [null, false],
      [undefined, false],
      ["string", false],
      [42, false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isFunction(input)).toBe(expected);
    });
  });

  describe("the isNumber function", () => {
    it.each([
      [42, true],
      [0, true],
      [-1, true],
      [3.14, true],
      [Number.MAX_VALUE, true],
      [Number.NaN, true],
      [Number.POSITIVE_INFINITY, true],
      [Number.NEGATIVE_INFINITY, true],
      ["42", false],
      [{}, false],
      [null, false],
      [undefined, false],
      [[], false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isNumber(input)).toBe(expected);
    });
  });

  describe("the isObject function", () => {
    it.each([
      [{}, true],
      [{ a: 1 }, true],
      [Object.create(null), true],
      [new Object(), true],
      [[], false],
      [new Date(), false],
      // biome-ignore lint/complexity/useRegexLiterals: Needed for test case.
      [new RegExp("a"), false],
      [null, false],
      [undefined, false],
      [() => {}, false], // Functions are not considered simple objects
      [class TestClass {}, false],
      [new (class {})(), true],
      [42, false],
      ["string", false],
      [true, false],
      [Symbol("test"), false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isObject(input)).toBe(expected);
    });
  });

  describe("the isObjectLiteral function", () => {
    it.each([
      [{}, true],
      [{ a: 1 }, true],
      [Object.create(null), true],
      [new Object(), true],
      [[], false],
      [new Date(), false],
      [null, false],
      [undefined, false],
      [() => {}, false],
      [class TestClass {}, false],
      [new (class {})(), false],
      [42, false],
      ["string", false],
      [true, false],
      [Symbol("test"), false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isObjectLiteral(input)).toBe(expected);
    });
  });

  describe("the isString function", () => {
    it.each([
      ["hello", true],
      ["", true],
      ["12345", true],
      [12345, false],
      [{}, false],
      [[], false],
      [null, false],
      [undefined, false],
      [true, false],
      [Symbol("test"), false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isString(input)).toBe(expected);
    });
  });

  describe("the isValidNumber function", () => {
    it.each([
      [100, true],
      ["100", false],
      [Number.NaN, false],
      [{}, false],
      [null, false],
      [undefined, false],
    ])("with input %p returns %p", (input, expected) => {
      expect(isValidNumber(input)).toBe(expected);
    });
  });
});
