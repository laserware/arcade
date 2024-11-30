import type { Dict } from "./types.js";

/**
 * Creates an array of [key, value] pairs for the specified `dict`.
 * The purpose of this function is to allow an override for the type of the
 * object key since TypeScript defaults to only allowing a string, number, or
 * symbol (but it could be an enum).
 *
 * Only use this function when you *know* that the return value of `Object.entries`
 * will always correspond to the keys/values of the specified object and doesn't
 * contain any extra keys/values (which is probably the case most of the time if
 * you're using plain JS objects).
 *
 * @remarks
 * The value type `V` is the first specifiable generic because in most cases, you're
 * using a string for the key (which is what is used for the second generic `K`
 * as the default).
 *
 * @template V Type of value in the specified `dict`.
 * @template K Type of key in the specified `key`.
 *
 * @param dict Object to extrapolate entries from.
 *
 * @returns Array of [key, value] pairs that adhere to the specified types.
 *
 * @example
 * enum SomeKey { A = "a", B = "b", C = "c" };
 *
 * const dict: Record<SomeKey, number> = {
 *   [SomeKey.A]: 1,
 *   [SomeKey.B]: 2,
 *   [SomeKey.C]: 3,
 * };
 *
 * const untypedEntries = Object.entries(dict);
 * for (const [key, value] of untypedEntries) {
 *   // This will throw a TypeScript error:
 *   console.log(dict[key]);
 * }
 *
 * const typedEntries = entriesOf<number, SomeKey>(dict);
 * for (const [key, value] of typedEntries) {
 * // This will *not* throw a TypeScript error:
 *   console.log(dict[key]);
 * }
 *
 * @category Object
 */
export const entriesOf = <V, K = string>(dict: Dict<V>): [K, V][] => {
  const entries = Object.entries(dict);

  return entries as [K, V][];
};
