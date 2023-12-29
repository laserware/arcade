/**
 * Clamps specified value within the inclusive lower and upper bounds.
 * @param value Value being clamped
 * @param lower Lower bounds for the value
 * @param upper Upper bounds for the value
 */
export function clamp(value: number, lower: number, upper: number): number {
  if (Math.min(value, lower) === value) {
    return lower;
  }

  if (Math.max(value, upper) === value) {
    return upper;
  }

  return value;
}
