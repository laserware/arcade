import { isNil } from "./isNil.js";

/**
 * Creates a copy of the specified array of `items` sorted by the optional
 * `compareFunc`. This is done because the native sort function mutates the array.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Array to sort.
 * @param [compareFunc] Optional compare function to use for sorting.
 *
 * @returns Array of items sorted naturally or by the specified `compareFunc`.
 *
 * @deprecated Use the [toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) built-in method on arrays.
 *
 * @category Array
 */
export function toSorted<T>(
  items: T[],
  compareFunc?: (a: T, z: T) => number,
): T[] {
  const copy = [...items];

  if (!isNil(compareFunc)) {
    copy.sort(compareFunc);
  } else {
    copy.sort();
  }

  return copy;
}
