/**
 * Returns a copy of the specified array reversed.
 * @param values Array of values to reverse order.
 */
export function toReversed<T>(values: T[]): T[] {
  const copy = [...values];

  copy.reverse();

  return copy;
}
