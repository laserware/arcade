import type { AnyDict } from "./types.js";

/**
 * Removes the specified key from the specified object and returns a copy of
 * the updated object.
 * @param object Object containing keys to omit
 * @param key Key in the object to omit
 */
export function omit<T extends AnyDict>(object: T, key: string): T;
/**
 * Removes the specified keys from the specified object and returns a copy of
 * the updated object.
 * @param object Object containing keys to omit
 * @param keys Keys in the object to omit
 */
export function omit<T extends AnyDict>(object: T, keys: string[]): T;

export function omit<T extends AnyDict>(
  object: T,
  keyOrKeys: string | string[],
): T {
  const updatedObject: Record<string, unknown> = {};

  const keysToOmit = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];

  for (const [key, value] of Object.entries(object)) {
    if (!keysToOmit.includes(key)) {
      updatedObject[key] = value;
    }
  }

  return updatedObject as unknown as T;
}
