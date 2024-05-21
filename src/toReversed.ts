/**
 * Returns a copy of the specified array reversed.
 *
 * @param values Array of values to reverse order.
 *
 * @deprecated Use the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed|toReversed} built-in method on arrays.
 */
export function toReversed<T>(values: T[]): T[] {
  const copy = [...values];

  copy.reverse();

  return copy;
}
