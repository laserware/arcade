/**
 * Creates a copy of the specified array of `values` with the items reversed.
 *
 * @param values Array of values to reverse order.
 *
 * @returns Array of values with items reversed.
 *
 * @deprecated Use the [toReversed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed) built-in method on arrays.
 *
 * @category Array
 */
export const toReversed = <T>(values: T[]): T[] => {
  const copy = [...values];

  copy.reverse();

  return copy;
};
