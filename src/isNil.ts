/**
 * Returns true if the specified value is null or undefined.
 *
 * @param value Value to check.
 */
export function isNil(
  value: unknown | null | undefined,
): value is null | undefined {
  // eslint-disable-next-line eqeqeq
  return value == null;
}
