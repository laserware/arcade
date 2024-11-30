import type { DictKey } from "./types.js";

/**
 * Appends a `value` to the `dict` entry associated with the specified `key`. If the
 * key is not present in the `dict`, add it as an array containing `value`.
 * The object is mutated for performance reasons, and the mutated `dict`
 * is returned.
 *
 * @template V Shape of `dict` object to update.
 * @template K Type of key that the specified `dict` object. This is useful if
 *             you have an object with a key that's an enum type.
 *
 * @param dict Object with a key and array value.
 * @param key Key of the object for which to append value.
 * @param value Value that gets appended to the array in the object.
 *
 * @returns The mutated object with the specified `key`/`value` appended to
 *          the specified `dict`.
 *
 * @example
 * const food = {
 *   fruits: ["banana", "apple", "orange"],
 *   vegs: ["lettuce"],
 * };
 *
 * // For existing groups:
 * appendToGroup(food, "vegs", "cucumber");
 *
 * console.log(food.vegs);
 * // ["lettuce", "cucumber"]
 *
 * // For new group:
 * appendToGroup(food, "candy", "Snickers");
 *
 * // Note that the group was created:
 * console.log(food.candy);
 * // ["Snickers"]
 *
 * @category Collection
 */
export function appendToGroup<V, K extends DictKey = string>(
  dict: Record<K, V[]>,
  key: K,
  value: V,
): Record<K, V[]>;

/**
 * Appends a `value` to the array value associated with the array `index`. If the
 * index is not present in the `groupedArray`, add it and append the value to the
 * array. The object is mutated for performance reasons, and the mutated
 * `groupedArray` is returned.
 *
 * @param groupedArray Array of arrays (with specified index as the key).
 * @param index Index of the array to update group values.
 * @param value Value that gets appended to the array in the dictionary.
 *
 * @returns The mutated array with the specified `index`/`value` appended to
 *          the specified `groupedArray`.
 *
 * @example
 * const food = [
 *   ["banana", "apple", "orange"],
 *   ["lettuce"],
 * ];
 *
 * // For existing groups:
 * appendToGroup(food, 1, "cucumber");
 *
 * console.log(food[1]);
 * // ["lettuce", "cucumber"]
 *
 * // For new group:
 * appendToGroup(food, 2, "Snickers");
 *
 * // Note that the group was created:
 * console.log(food[2]);
 * // ["Snickers"]
 *
 * @category Collection
 */
export function appendToGroup<V, K = number>(
  groupedArray: V[][],
  index: K,
  value: V,
): V[][];

/**
 * Appends a specified value to an object or array using a specified key (for
 * objects) or index (for arrays).
 */
export function appendToGroup<V, K extends DictKey | number>(
  dictOrGroupedArray: K extends number ? V[][] : Record<K, V[]>,
  keyOrIndex: K,
  value: V,
): K extends number ? V[][] : Record<K, V[]> {
  // I'm doing all the TypeScript ignoring here because this code will work for
  // objects _and_ arrays, but TypeScript is freaking out.

  // @ts-ignore
  if (dictOrGroupedArray[keyOrIndex]) {
    // @ts-ignore
    dictOrGroupedArray[keyOrIndex].push(value);
  } else {
    // @ts-ignore
    dictOrGroupedArray[keyOrIndex] = [value];
  }

  return dictOrGroupedArray;
}
