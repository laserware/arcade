/**
 * Removes the item at the specified index from the specified items array.
 *
 * @param items Array of items containing the item to remove.
 * @param index Index of the item to remove.
 */
export function removeAtIndex<T>(items: T[], index: number): T[] {
  const itemsBeforeIndex = items.slice(0, index);
  const itemsAfterIndex = items.slice(index + 1);

  return [...itemsBeforeIndex, ...itemsAfterIndex];
}
