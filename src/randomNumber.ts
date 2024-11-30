/**
 * Returns a random integer between the `minimum` and `maximum` specified values.
 *
 * @param minimum Minimum random number to return.
 * @param maximum Maximum random number to return.
 *
 * @returns Random number between specified `minimum` and `maximum`.
 *
 * @category Number
 */
export function randomNumber(minimum: number, maximum: number): number {
  const result = Math.random() * (maximum - minimum) + minimum;

  return Math.floor(result);
}
