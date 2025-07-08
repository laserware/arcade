import type { AnyDict } from "./types.js";

/**
 * Sums the values of the specified `field` in the specified `collection` of objects.
 *
 * @param collection Collection of objects containing a field with a number value.
 * @param field Field to get the sum for.
 *
 * @returns Sum of the specified `field` from the specified `collection`.
 *
 * @throws [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if any of the values in the `collection` are not valid numbers.
 *
 * @category Collection
 */
export function sumBy(collection: AnyDict[], field: string): number {
  let total = 0;

  if (collection.length === 0) {
    return total;
  }

  const firstValue = collection[0][field] ?? null;

  if (firstValue === null) {
    throw new Error(`Field "${field}" does not exist in collection`);
  }

  for (const item of collection) {
    const value = Number(item[field]);

    if (Number.isNaN(value)) {
      throw new TypeError(`Field "${field}" is not a valid number`);
    }

    total += value;
  }

  return total;
}
