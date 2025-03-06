/**
 * Inserts the specified `item` into the specified `array` at the specified `index`.
 *
 * @param array Existing array to add items to.
 * @param index Index at which to insert items.
 * @param item Item to insert in the array at the specified index.
 *
 * @returns The updated array.
 *
 * @throws [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the specified `index` is out of bounds.
 *
 * @example
 * const values = [1, 2, 3, 4, 5, 6];
 *
 * const updated = insertAtIndex(values, 0, 8);
 * // [8, 1, 2, 4, 5, 6]
 *
 * @category Array
 */
export function insertAtIndex<T>(array: T[], index: number, item: T): T[];

/**
 * Inserts the specified `items` into the specified `array` at the specified `index`.
 *
 * @param array Existing array to add items to.
 * @param index Index at which to insert items.
 * @param items Items to insert in the array at the specified index.
 *
 * @returns The updated array.
 *
 * @throws [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the specified `index` is out of bounds.
 *
 * @example
 * const values = [1, 2, 3, 4, 5, 6];
 *
 * const updated = insertAtIndex(values, 0, [8, 9, 10]);
 * // [8, 9, 10, 1, 2, 4, 5, 6]
 *
 * @category Array
 */
export function insertAtIndex<T>(array: T[], index: number, items: T[]): T[];

/** @ignored */
export function insertAtIndex<T>(
  array: T[],
  index: number,
  items: T | T[],
): T[] {
  const allItems = Array.isArray(items) ? items : [items];
  if (allItems.length === 0) {
    return array;
  }

  if (index < 0 || index > array.length) {
    throw new RangeError(`Index ${index} is out of bounds`);
  }

  return [...array.slice(0, index), ...allItems, ...array.slice(index)];
}
