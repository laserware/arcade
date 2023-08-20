import type { Dict } from "./types.js";

/**
 * Returns an array of [key, value] pairs for the specified object.
 * The purpose of this function is to allow an override for the type of the
 * object key since TypeScript defaults to only allowing a string (but it
 * could be a string enum).
 */
export function toEntries<TValue, TKey = string>(
  object: Dict<TValue>,
): [TKey, TValue][] {
  const entries = Object.entries(object);

  return entries as [TKey, TValue][];
}