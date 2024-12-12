/* istanbul ignore file -- @preserve: Functions are based on environment, which is tricky to mock. */

export type Runtime = "browser" | "node";

/**
 * Checks if the program is running in the specified `runtime`.
 *
 * @param runtime Runtime environment to check for.
 *
 * @returns `true` if the program is running in the specified `runtime`.
 *
 * @category Utility
 */
export function isRunningIn(runtime: Runtime): boolean {
  switch (runtime) {
    case "browser": {
      return typeof window !== "undefined" || typeof self !== "undefined";
    }

    case "node": {
      return typeof window === "undefined" && typeof process !== "undefined";
    }

    default:
      throw new Error(`Invalid runtime ${runtime} specified`);
  }
}
