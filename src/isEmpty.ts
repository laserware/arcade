import { isNil } from "./isNil.js";

/**
 * Returns true if the specified value is empty.
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
