/**
 * Checks if the specified `value` is less than or equal to the specified
 * `other` value.
 *
 * @param value Value to compare.
 * @param other Other value to compare.
 *
 * @returns `true` if the specified `value` is less than or equal to `other`.
 *
 * @category Number
 */
export function lte(value: number | string, other: number | string): boolean {
  if (typeof value === "string") {
    value = Number(value);
  }

  if (typeof other === "string") {
    other = Number(other);
  }

  return value <= other;
}
