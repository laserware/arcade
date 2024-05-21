/**
 * Returns the specified array with unique values.
 *
 * @param values Array to remove duplicates from.
 */
export function uniq<T>(values: T[]): T[] {
  return [...new Set(values)];
}
