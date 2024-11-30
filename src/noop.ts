/* istanbul ignore file -- @preserve: No functionality to test. */

/**
 * Does nothing. Useful for initializing function variables or properties
 * before assigning values. Note that it returns `any` instead of `void` and
 * accepts arbitrary arguments so TypeScript doesn't freak out.
 *
 * @returns Nothing, the function doesn't do anything.
 *
 * @category Function
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (...args: any[]): any => {
  // Does nothing.
};
