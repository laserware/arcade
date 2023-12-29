import { appendToObjectArray } from "./appendToObjectArray";
import type { Dict, DictKey } from "./types";

type Iteratee<T> = (value: T) => DictKey;

/**
 * Groups the specified array of values by the specified property.
 * @param values Array of values to group
 * @param property Property of values item to group by
 */
export function groupBy<T>(values: T[], property: string): Dict<T[]>;

/**
 * Groups the specified array of values by the return value of the specified
 * iteratee.
 * @param values Array of values to group
 * @param iteratee Function that returns the key to group by
 */
export function groupBy<T>(values: T[], iteratee: Iteratee<T>): Dict<T[]>;

export function groupBy<T>(
  values: T[],
  iterateeOrProperty: Iteratee<T> | string,
): Dict<T[]> {
  if (!Array.isArray(values)) {
    throw new Error("Expected an array for the first argument");
  }

  let result: Dict<T[]> = {};
  for (let index = 0; index < values.length; index++) {
    const item = values[index];

    const key =
      typeof iterateeOrProperty === "string"
        ? item[iterateeOrProperty as keyof typeof item]
        : iterateeOrProperty(item);
    result = appendToObjectArray(result, key as DictKey, item);
  }

  return result;
}
