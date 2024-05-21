import { isNil } from "./isNil.js";

/**
 * Returns true if the specified value is empty. The definition of empty in this
 * case is:
 *  - The value is `null` or `undefined`.
 *  - If the value is a string, the value is an empty string (`""`).
 *  - If the value is an array, the array has no elements.
 *  - If the value is a Map or Set, the `size` is `0`.
 *  - If the value is an object, it has no properties.
 *
 * @param value Value to check for emptiness.
 */
export function isEmpty(value: any): boolean {
  if (isNil(value)) {
    return true;
  }

  if (typeof value === "string") {
    return value === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  try {
    return Object.keys(value).length === 0;
  } catch {
    return false;
  }
}
