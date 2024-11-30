import type { AnyDict } from "./types.js";

/**
 * Sums the values of the specified `field` in the specified `collection` of objects.
 *
 * @param collection Collection of objects containing a field with a number value.
 * @param field Field to get sum for.
 *
 * @returns Sum of the specified `field` from the specified `collection`.
 *
 * @category Collection
 */
export const sumBy = (collection: AnyDict[], field: string): number => {
  let total = 0;

  if (collection.length === 0) {
    return total;
  }

  const firstValue = collection[0][field] ?? null;

  if (firstValue === null) {
    throw new Error(`Field "${field}" does not exist in collection`);
  }

  if (Number.isNaN(firstValue)) {
    throw new Error(`Field "${field}" is not a valid number`);
  }

  for (const item of collection) {
    total += item[field];
  }

  return total;
};
