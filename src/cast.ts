/**
 * Forces the specified value to be the specified type `T` to get around annoying
 * TypeScript idiosyncrasies.
 *
 * @template T Type to cast specified `value` as.
 *
 * @param value Value to cast to `T`.
 *
 * @returns The specified value as type `T`.
 *
 * @category Utility
 */
export function cast<T>(value: any): T {
  return value as unknown as T;
}
