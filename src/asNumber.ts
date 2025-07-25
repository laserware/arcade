import { isValidNumber } from "./isPrimitives.js";

/**
 * Attempts to extract the numeric value from the specified `value`. This
 * function will _always_ return a number. If a number cannot be extracted from
 * the value, it returns the specified `fallback`.
 *
 * @param value Value from which to extract number.
 * @param [fallback=0] Optional fallback if a number cannot be extracted.
 *
 * @returns The number extracted from the specified `value` if valid, otherwise the specified `fallback`.
 *
 * @example
 * asNumber("12px");
 * // 12
 *
 * asNumber("Hello", 20);
 * // 20
 *
 * asNumber("Hello");
 * // 0
 *
 * @category Number
 */
export function asNumber(value: unknown, fallback = 0): number {
  if (isValidNumber(value)) {
    return value;
  }

  if (typeof value === "string") {
    // If the string has _no_ numbers, we return the fallback. If we didn't
    // do this check, the function would return `0` and ignore the fallback:
    if (!/\d/.test(value)) {
      return fallback;
    }

    const numericValue = Number(value.replace(/\D/g, ""));

    // Not covered in tests but highly unlikely to hit:
    if (Number.isNaN(numericValue)) {
      return fallback;
    } else {
      return numericValue;
    }
  }

  return fallback;
}
