/**
 * Removes the item at the specified `index` from the specified `items` array.
 *
 * @param items Array of items containing the item to remove.
 * @param index Index of the item to remove.
 *
 * @returns Copy of array with item at `index` removed. If the specified `items`
 *          array is empty, returns `items`.
 *
 * @throws [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the specified `index` is out of bounds.
 *
 * @category Array
 */
export const removeAtIndex = <T>(items: T[], index: number): T[] => {
  if (items.length === 0) {
    return items;
  }

  if (index < 0 || index > items.length - 1) {
    throw new RangeError(`Index ${index} is out of bounds`);
  }

  const itemsBeforeIndex = items.slice(0, index);
  const itemsAfterIndex = items.slice(index + 1);

  return [...itemsBeforeIndex, ...itemsAfterIndex];
};
