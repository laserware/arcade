/* istanbul ignore file -- @preserve: Functions are based on environment, which is tricky to mock. */

/**
 * Checks if the program is running in the browser.
 *
 * @returns `true` if the program is running in the browser.
 *
 * @category Utility
 */
export function isRunningInBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Checks if the program is running in Node.js.
 *
 * @returns `true` if the program is running in Node.js.
 *
 * @category Utility
 */
export function isRunningInNode(): boolean {
  const globalNavigator = globalThis.navigator as { userAgent: string };

  return /node/i.test(globalNavigator.userAgent);
}
