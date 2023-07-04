import type { RecordKey } from "./types.js";

/**
 * Appends a value to the array value associated with the specified key. If the
 * key is not present in the object, add it and append the value to the
 * array.
 * @param object Object with a key and array value
 * @param key Key of the object for which to append value
 * @param value Value that gets appended to the array in the object
 */
export function appendToObjectArray<TValue, TKey extends RecordKey = string>(
  object: Record<TKey, TValue[]>,
  key: TKey,
  value: TValue,
): Record<TKey, TValue[]> {
  const objectCopy = { ...object };

  if (objectCopy[key]) {
    objectCopy[key].push(value);
  } else {
    objectCopy[key] = [value];
  }

  return objectCopy;
}
