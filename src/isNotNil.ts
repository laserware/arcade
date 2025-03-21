import { isNil } from "./isNil.js";

/**
 * Checks if the specified value is **not** `null` and **not** `undefined`.
 *
 * @param value Value to check.
 *
 * @returns `true` if the `value` is defined.
 *
 * @category Utility
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}
