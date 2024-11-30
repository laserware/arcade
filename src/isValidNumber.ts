import { isNil } from "./isNil.js";

/**
 * Checks if the specified `value` is a valid number. If the `value` is `NaN`,
 * returns `false`.
 *
 * @param value Value to check if valid number.
 *
 * @returns `true` if the specified `value` is a valid number.
 *
 * @category Number
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
