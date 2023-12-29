import type { Dict } from "./types";

/**
 * Returns an array of [key, value] pairs for the specified object.
 * The purpose of this function is to allow an override for the type of the
 * object key since TypeScript defaults to only allowing a string (but it
 * could be a string enum).
 */
export function toEntries<V, K = string>(object: Dict<V>): [K, V][] {
  const entries = Object.entries(object);

  return entries as [K, V][];
}
