import type { AnyDict } from "./types.js";

/**
 * Removes the specified key from the specified dictionary and returns a copy of
 * the updated dictionary.
 *
 * @param dict Dictionary containing keys to omit.
 * @param key Key in the dictionary to omit.
 */
export function omit<T extends AnyDict>(dict: T, key: string): T;

/**
 * Removes the specified keys from the specified dictionary and returns a copy
 * of the updated dictionary.
 *
 * @param dict Dictionary containing keys to omit.
 * @param keys Keys in the dictionary to omit.
 */
export function omit<T extends AnyDict>(dict: T, keys: string[]): T;

export function omit<T extends AnyDict>(
  dict: T,
  keyOrKeys: string | string[],
): T {
  const updatedObject: Record<string, unknown> = {};

  const keysToOmit = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

  for (const [key, value] of Object.entries(dict)) {
    if (!keysToOmit.includes(key)) {
      updatedObject[key] = value;
    }
  }

  return updatedObject as unknown as T;
}
