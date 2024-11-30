import { appendToGroup } from "./appendToGroup.js";
import type { Dict, DictKey } from "./types.js";

/**
 * Function that iterates over the specified object `value` and returns the
 * key.
 *
 * @template T Type of object being iterated.
 *
 * @category Collection
 */
export type Iteratee<T> = (value: T) => DictKey;

/**
 * Groups the specified `values` array by the specified `property`.
 *
 * @param values Array of values to group.
 * @param property Property of values item to group by.
 *
 * @returns Object with key of `property` and value of values keyed by `property`.
 *
 * @category Collection
 */
export function groupBy<T>(values: T[], property: string): Dict<T[]>;

/**
 * Groups the specified `values` array by the return value of the specified
 * `iteratee`.
 *
 * @param values Array of values to group.
 * @param iteratee Function that returns the key to group by.
 *
 * @returns Object with key of `property` and value of values keyed by `iteratee`.
 *
 * @category Collection
 */
export function groupBy<T>(values: T[], iteratee: Iteratee<T>): Dict<T[]>;

/**
 * Groups values by a property or return value of an iterator function.
 */
export function groupBy<T>(
  values: T[],
  iterateeOrProperty: Iteratee<T> | string,
): Dict<T[]> {
  if (!Array.isArray(values)) {
    throw new Error("Expected an array for the first argument");
  }

  const result: Dict<T[]> = {};

  for (let index = 0; index < values.length; index++) {
    const item = values[index];

    const key =
      typeof iterateeOrProperty === "string"
        ? item[iterateeOrProperty as keyof typeof item]
        : iterateeOrProperty(item);
    appendToGroup(result, key as DictKey, item);
  }

  return result;
}
