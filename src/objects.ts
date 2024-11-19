import type { AnyPlainObject } from "./types.js";

/**
 * Returns true if the specified value is a plain object.
 *
 * @param value Value to check if plain object.
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
