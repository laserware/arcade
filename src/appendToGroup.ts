import type { DictKey } from "./types.js";

/**
 * Appends a value to the array value associated with the specified key. If the
 * key is not present in the dictionary, add it and append the value to the
 * array. The object is mutated for performance reasons, and the mutated dictionary
 * is returned.
 * @param dict Dictionary with a key and array value.
 * @param key Key of the dictionary for which to append value.
 * @param value Value that gets appended to the array in the dictionary.
 */
export function appendToGroup<V, K extends DictKey = string>(
  dict: Record<K, V[]>,
  key: K,
  value: V,
): Record<K, V[]> {
  if (dict[key]) {
    dict[key].push(value);
  } else {
    dict[key] = [value];
  }

  return dict;
}
