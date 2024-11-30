/**
 * Removes any duplicate values from the specified `items` array.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array to remove duplicates from.
 *
 * @returns Array of items with duplicates removed.
 *
 * @category Utility
 */
export function uniq<T>(items: T[]): T[] {
  return [...new Set(items)];
}
