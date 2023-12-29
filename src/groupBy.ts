import { appendToObjectArray } from "./appendToObjectArray";
import type { Dict, DictKey } from "./types";

type Iteratee<T> = (value: T) => DictKey;

export function groupBy<T>(values: T[], property: string): Dict<T[]>;
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
