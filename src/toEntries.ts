import type { Dict } from "./types.js";

/**
 * Creates an array of [key, value] pairs for the specified `dict`.
 * The purpose of this function is to allow an override for the type of the
 * object key since TypeScript defaults to only allowing a string (but it
 * could be a string enum).
 *
 * @param dict Object to extrapolate entries from.
 *
 * @returns Array of [key, value] pairs that adhere to the specified types.
 *
 * @deprecated Use {@linkcode entriesOf} instead.
 *
 * @category Object
 */
export const toEntries = <V, K = string>(dict: Dict<V>): [K, V][] => {
  const entries = Object.entries(dict);

  return entries as [K, V][];
};
