import { isNil } from "./isNil.js";
import { isValidNumber } from "./isValidNumber.js";

/**
 * Attempts to extract the numeric value from the specified `value`. This
 * function will _always_ return a number. If a number cannot be extracted from
 * the value, returns the specified `fallback`.
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
export function asNumber(value: unknown, fallback: number = 0): number {
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

    /* istanbul ignore if -- @preserve: I don't think we'll ever hit this condition, but I'm hedging my bets. */
    if (Number.isNaN(numericValue)) {
      return fallback;
    } else {
      return numericValue;
    }
  }

  return fallback;
}

/**
 * Attempts to coerce the specified `value` to a number. If the value cannot be
 * coerced to a valid number, returns the specified `fallback` value.
 *
 * @param value Value to coerce to a number.
 * @param [fallback=0] Value to return if the specified value cannot be coerced to a number.
 *
 * @returns The specified `value` as a number if valid, otherwise the specified `fallback`.
 *
 * @category Number
 */
export function toNumber(value: unknown, fallback: number = 0): number {
  if (isNil(value)) {
    return fallback;
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return fallback;
  } else {
    return numericValue;
  }
}
