import { isNil } from "./isNil.js";

/**
 * Checks if the specified `value` is an array of the specified type.
 *
 * @template T Type in array to check for.
 *
 * @param value Value to check.
 * @param predicate Predicate function to confirm the type matches.
 *
 * @returns `true` if the `value` is an array of the specified type.
 *
 * @category Utility
 */
export function isArrayOf<T>(
  value: unknown,
  predicate: (value: any) => boolean,
): value is T[] {
  if (!isFunction(predicate)) {
    return false;
  }

  return Array.isArray(value) && (value as any).every(predicate);
}

/**
 * Checks if the specified `value` is a boolean.
 *
 * @param value Value to check if boolean.
 *
 * @returns `true` if the `value` is a boolean.
 *
 * @category Utility
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks if the specified `value` is a function.
 *
 * @param value Value to check if a function.
 *
 * @returns `true` if the `value` is a function.
 *
 * @category Utility
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

/**
 * Checks if the specified `value` is a number.
 *
 * @param value Value to check if number.
 *
 * @returns `true` if the `value` is a number.
 *
 * @category Utility
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * Checks if the specified `value` is a non-null object, but **not** an `Array`,
 * `RegExp`, or `Date`.
 *
 * @param value Value to check if an object.
 *
 * @returns `true` if the value is an object.
 *
 * @category Utility
 */
export function isObject(value: unknown): value is Object {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof RegExp) &&
    !(value instanceof Date)
  );
}

/**
 * Checks if the specified `value` is a plain object.
 *
 * @param value Value to check if plain object.
 *
 * @returns `true` if the `value` is a plain object.
 *
 * @category Utility
 */
export function isObjectLiteral(value: unknown): value is Record<any, any> {
  if (isNil(value)) {
    return false;
  }

  if (typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  if (value instanceof RegExp || value instanceof Date) {
    return false;
  }

  return (
    (value as object).constructor === Object ||
    Object.getPrototypeOf(value) === null ||
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Checks if the specified `value` is a string.
 *
 * @param value Value to check if a string.
 *
 * @returns `true` if the `value` is a string.
 *
 * @category Utility
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if the specified `value` is a valid number. If the `value` is `NaN`,
 * returns `false`.
 *
 * @param value Value to check if valid number.
 *
 * @returns `true` if the specified `value` is a valid number.
 *
 * @category Utility
 */
export function isValidNumber(value: unknown): value is number {
  if (isNil(value)) {
    return false;
  }

  if (typeof value === "number" && !Number.isNaN(value)) {
    return true;
  }

  if (typeof value === "string") {
    return false;
  }

  return !Number.isNaN(Number(value));
}
