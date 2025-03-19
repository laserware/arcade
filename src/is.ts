import { isEqual } from "./equals.js";
import { isEmpty } from "./isEmpty.js";
import { isNil } from "./isNil.js";
import { isNotNil } from "./isNotNil.js";
import {
  isArrayOf,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isObjectLiteral,
  isString,
  isValidNumber,
} from "./isPrimitives.js";

/**
 * Object with all is available (useful for checking for multiple conditions
 * in the same file).
 *
 * @category Utility
 */
export const is = {
  /**
   * Returns true if the specified `value` is an array of the specified type `T`.
   */
  arrayOf<T>(value: unknown, predicate: (value: any) => boolean): value is T[] {
    return isArrayOf(value, predicate);
  },
  /**
   * Returns true if the specified `value` is a boolean.
   */
  boolean: isBoolean,
  /**
   * Returns true if the specified `value` is a function.
   */
  function: isFunction,
  /**
   * Returns true if the specified `value` is a number.
   */
  number: isNumber,
  /**
   * Returns true if the specified `value` is a non-null object that is **not**
   * an `Array`, `RegExp`, or `Date`.
   */
  object: isObject,
  /**
   * Returns true if the specified `value` is an object literal.
   */
  objectLiteral: isObjectLiteral,
  /**
   * Returns true if the specified `value` is a string.
   */
  string: isString,
  /**
   * Returns true if the specified `value` is a *valid* number (i.e. not `NaN`).
   */
  validNumber: isValidNumber,
  /**
   * Returns true if the specified `value` is empty.
   */
  empty: isEmpty,
  /**
   * Returns true if the specified values are equal.
   */
  equal: isEqual,
  /**
   * Returns true if the specified `value` is `null` or `undefined`.
   *
   */
  nil: isNil,
  /**
   * Returns true if the specified `value` is *not* `null` or `undefined`.
   *
   */
  notNil: isNotNil,
};
