import { isNil } from "./isNil.js";

/**
 * Returns a copy of the specified array sorted by the optional compare function.
 * This is done because the native sort function mutates the array.
 *
 * @param values Array to sort.
 * @param [compareFunc] Optional compare function to use for sorting.
 *
 * @deprecated Use the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted|toSorted} built-in method on arrays.
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
