/**
 * Does nothing. Useful for initializing function variables or properties
 * before assigning values. Note that it returns `any` instead of `void` and
 * accepts arbitrary arguments so TypeScript doesn't freak out.
 *
 * @returns Nothing, the function doesn't do anything.
 *
 * @category Function
 */
export function noop(...args: any[]): any {
  // Does nothing.
}
