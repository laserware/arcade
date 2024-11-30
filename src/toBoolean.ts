/**
 * Converts the specified `value` to a boolean (note that it is case-insensitive).
 *
 * @param value Value to convert to a boolean.
 *
 * @returns Boolean representation of the specified `value`.
 *
 * @category Utility
 */
export function toBoolean(
  value: boolean | number | string | null | undefined,
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return /true/i.test(value);
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  return false;
}
