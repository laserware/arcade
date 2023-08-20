/**
 * Returns a copy of the specified array reversed.
 */
export function toReversed<T>(values: T[]): T[] {
  const copy = [...values];

  copy.reverse();

  return copy;
}
