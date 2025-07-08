/**
 * Removes the item at the specified `index` from the specified `items` array.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array of items containing the item to remove.
 * @param index Index of the item to remove.
 *
 * @returns Copy of the array with item at `index` removed. If the specified `items`
 *          array is empty, returns `items`.
 *
 * @throws [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the specified `index` is out of bounds.
 *
 * @example
 * const values = [1, 2, 3, 4, 5, 6];
 *
 * const updated = removeAtIndex(values, 2);
 * // [1, 2, 4, 5, 6]
 *
 * @category Array
 */
export function removeAtIndex<T>(items: T[], index: number): T[] {
  if (items.length === 0) {
    return items;
  }

  if (index < 0 || index > items.length - 1) {
    throw new RangeError(`Index ${index} is out of bounds`);
  }

  const itemsBeforeIndex = items.slice(0, index);
  const itemsAfterIndex = items.slice(index + 1);

  return [...itemsBeforeIndex, ...itemsAfterIndex];
}
