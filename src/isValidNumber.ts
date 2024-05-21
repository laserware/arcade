/**
 * Returns true if the specified value is a valid number.
 *
 * @param value Value to check if valid number.
 */
export function isValidNumber(
  value: number | string | unknown,
): value is number {
  if (typeof value === "number") {
    return true;
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return false;
  }

  return Number.isFinite(numericValue);
}
