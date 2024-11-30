/**
 * Capitalizes the first letter of the specified value and returns the result.
 *
 * @param value Value to capitalize.
 *
 * @returns The specified `value` capitalized.
 *
 * @category String
 */
export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase().concat(value.slice(1));
