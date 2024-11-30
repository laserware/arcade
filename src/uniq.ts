/**
 * Removes any duplicate values from the specified `values` array.
 *
 * @param values Array to remove duplicates from.
 *
 * @returns Array of values with duplicates removed.
 *
 * @category Utility
 */
export const uniq = <T>(values: T[]): T[] => [...new Set(values)];
