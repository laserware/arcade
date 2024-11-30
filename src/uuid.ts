/* istanbul ignore file -- @preserve: This just picks which `randomUUID` to use based on the env. */

import { isRunningInNode } from "./environment.js";

/**
 * Generates a V4 UUID using the [Node.js crypto.randomUUID](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions)
 * function or the browser's [crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
 * function. The correct one to use is determined automatically.
 *
 * @returns A UUID string.
 *
 * @category Utility
 */
export const uuid = (): string => {
  if (isRunningInNode()) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("node:crypto").randomUUID();
  }

  if (typeof window !== "undefined" && "crypto" in window) {
    return window.crypto.randomUUID();
  }

  throw new Error("Unable to generate UUID");
};
