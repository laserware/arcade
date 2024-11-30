import type { KeysOf } from "./types.js";

/**
 * Gets the keys of the specified `dict` as an array that won't throw a
 * TypeScript error if you try to loop through them and access values from the
 * corresponding `dict`.
 *
 * Only use this function when you _know_ that the return value of `Object.keys`
 * will always correspond to the keys of the specified `dict` and doesn't contain
 * any extra keys (which is probably the case most of the time if you're using
 * plain JS objects).
 *
 * @param dict Object to extrapolate keys from.
 *
 * @returns Array of keys that are typed for the specified `dict`.
 *
 * @example
 * const value = { a: 1, b: 2, c: 3 };
 *
 * const untypedKeys = Object.keys(value);
 * for (const key of untypedKeys) {
 *   // This will throw a TypeScript error:
 *   console.log(value[key]);
 * }
 *
 * const typedKeys = keysOf(value);
 * for (const key of typedKeys) {
 * // This will *not* throw a TypeScript error:
 *   console.log(value[key]);
 * }
 *
 * @category Object
 */
export const keysOf = <T extends Record<any, any>>(dict: T): KeysOf<T> =>
  Object.keys(dict) as KeysOf<T>;
