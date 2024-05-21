/**
 * Returns true if the specified value is greater than or equal to the
 * other value.
 *
 * @param value Value to compare.
 * @param other Other value to compare.
 */
export function gte(value: number | string, other: number | string): boolean {
  if (typeof value === "string") {
    value = Number(value);
  }

  if (typeof other === "string") {
    other = Number(other);
  }

  return value >= other;
}

/**
 * Returns true if the specified value is less than or equal to the
 * other value.
 *
 * @param value Value to compare.
 * @param other Other value to compare.
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
