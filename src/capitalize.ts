/**
 * Capitalizes the first letter of the specified value and returns the result.
 *
 * @param value Value to capitalize.
 *
 * @returns The specified `value` capitalized.
 *
 * @category String
 */
export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase().concat(value.slice(1));
}
