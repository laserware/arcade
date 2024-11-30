/**
 * Checks if the specified `value` is `null` or `undefined`.
 *
 * @param value Value to check.
 *
 * @returns `true` if the `value` is `null` or `undefined`.
 *
 * @category Utility
 */
export function isNil(
  value: unknown | null | undefined,
): value is null | undefined {
  // eslint-disable-next-line eqeqeq
  return value == null;
}
