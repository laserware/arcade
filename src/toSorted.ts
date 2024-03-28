import { isNil } from "./isNil.js";

/**
 * Returns a copy of the specified array sorted by the optional compare function.
 * This is done because the native sort function mutates the array.
 * @param values Array to sort.
 * @param [compareFunc] Optional compare function to use for sorting.
 */
export function toSorted<T>(
  values: T[],
  compareFunc?: (a: T, z: T) => number,
): T[] {
  const copy = [...values];

  if (!isNil(compareFunc)) {
    copy.sort(compareFunc);
  } else {
    copy.sort();
  }

  return copy;
}
