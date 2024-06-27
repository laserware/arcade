import type { DictKey } from "./types.js";

/**
 * Appends a value to the array value associated with the specified key. If the
 * key is not present in the dictionary, add it and append the value to the
 * array. The object is mutated for performance reasons, and the mutated dictionary
 * is returned.
 *
 * @param dict Dictionary with a key and array value.
 * @param key Key of the dictionary for which to append value.
 * @param value Value that gets appended to the array in the dictionary.
 */
export function appendToGroup<V, K extends DictKey = string>(
  dict: Record<K, V[]>,
  key: K,
  value: V,
): Record<K, V[]>;

/**
 * Appends a value to the array value associated with the array index. If the
 * index is not present in the array, add it and append the value to the
 * array. The object is mutated for performance reasons, and the mutated array
 * is returned.
 *
 * @param groupedArray Array of arrays (with specified index as the key).
 * @param index Index of the array to update group values.
 * @param value Value that gets appended to the array in the dictionary.
 */
export function appendToGroup<V, K = number>(
  groupedArray: V[][],
  index: K,
  value: V,
): V[][];

export function appendToGroup<V, K extends DictKey | number>(
  dict: K extends number ? V[][] : Record<K, V[]>,
  key: K,
  value: V,
): K extends number ? V[][] : Record<K, V[]> {
  // I'm doing all the TypeScript ignoring here because this code will work for
  // objects _and_ arrays, but TypeScript is freaking out.

  // @ts-ignore
  if (dict[key]) {
    // @ts-ignore
    dict[key].push(value);
  } else {
    // @ts-ignore
    dict[key] = [value];
  }

  return dict;
}
