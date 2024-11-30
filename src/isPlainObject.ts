import type { AnyPlainObject } from "./types.js";

/**
 * Checks if the specified `value` is a plain object.
 *
 * @param value Value to check if plain object.
 *
 * @returns `true` if the `value` is a plain object.
 *
 * @category Object
 */
export function isPlainObject(value: any): value is AnyPlainObject {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  return Object.getPrototypeOf(value) === Object.prototype;
}
