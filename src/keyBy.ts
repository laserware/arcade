import type { Dict } from "./types.js";

/**
 * Converts a collection of `items` to keyed by the specified `field` name.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array of objects.
 * @param field Field to key by.
 *
 * @returns Object with key of the `field` name and value of the entry that corresponds to `field`.
 *
 * @example
 * keyBy(
 *   { id: "a", value: 1 },
 *   { id: "b", value: 2 },
 *   "id",
 * );
 * // { a: { id: "a", value: 1 }, b: { id: "b", value: 2 } }
 *
 * @category Collection
 */
export function keyBy<T>(items: T[], field: string): Dict<T> {
  const keyedItems = items as (T & { [field: string]: unknown })[];
  const itemCount = keyedItems.length;

  const dict: Dict<T> = {};

  // Using an old-school for loop here to make it snappy. Using the `reduce`
  // method allocates extra arrays:
  for (let index = 0; index < itemCount; index++) {
    const value = keyedItems[index];

    const key = value[field] as string;
    if (key === undefined) {
      // prettier-ignore
      throw new Error(`Unable to convert array to dictionary, key field ${field} not found`);
    }

    dict[key] = value;
  }

  return dict;
}
