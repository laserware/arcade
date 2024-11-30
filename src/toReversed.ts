/**
 * Creates a copy of the specified array of `items` with the items reversed.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array of items to reverse order.
 *
 * @returns Array of items with items reversed.
 *
 * @deprecated Use the [toReversed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) built-in method on arrays.
 *
 * @category Array
 */
export function toReversed<T>(items: T[]): T[] {
  const copy = [...items];

  copy.reverse();

  return copy;
}
