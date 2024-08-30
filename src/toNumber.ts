import { isNil } from "./isNil.js";

/**
 * Attempts to coerce the specified value to a number. If the value cannot be
 * coerced to a valid number, returns the specified fallback value.
 *
 * @param value Value to coerce to a number.
 * @param fallback Value to return if the specified value cannot be coerced to a number.
 */
export function toNumber(value: unknown, fallback: number): number {
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