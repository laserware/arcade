import { appendToGroup } from "./appendToGroup.js";
import type { Dict, DictKey } from "./types.js";

/**
 * Function that iterates over the specified object `item` and returns the
 * key.
 *
 * @template T Type of object being iterated.
 *
 * @category Collection
 */
export type Iteratee<T> = (item: T) => DictKey;

/**
 * Groups the specified `items` array by the specified `property`.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array of items to group.
 * @param property Property of item to group by.
 *
 * @returns Object with a key of `property` and value of values keyed by `property`.
 *
 * @category Collection
 */
export function groupBy<T>(items: T[], property: string): Dict<T[]>;

/**
 * Groups the specified `items` array by the return value of the specified
 * `iteratee`.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array of items to group.
 * @param iteratee Function that returns the key to group by.
 *
 * @returns Object with a key of `property` and value of values keyed by `iteratee`.
 *
 * @category Collection
 */
export function groupBy<T>(items: T[], iteratee: Iteratee<T>): Dict<T[]>;

export function groupBy<T>(
  items: T[],
  iterateeOrProperty: Iteratee<T> | string,
): Dict<T[]> {
  if (!Array.isArray(items)) {
    throw new Error("Expected an array for the first argument");
  }

  const result: Dict<T[]> = {};

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    const key =
      typeof iterateeOrProperty === "string"
        ? item[iterateeOrProperty as keyof typeof item]
        : iterateeOrProperty(item);
    appendToGroup(result, key as DictKey, item);
  }

  return result;
}
