/**
 * Generates a V4 UUID using the [Node.js crypto.randomUUID](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions)
 * function or the browser's [crypto.randomUUID](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
 * function. The correct one to use is determined automatically.
 *
 * @returns A UUID string.
 *
 * @category Utility
 */
export function uuid(): string {
  let result: string | undefined;

  try {
    if (typeof window !== "undefined" && "crypto" in window) {
      result = window.crypto.randomUUID();
    }
  } catch {
    // Do nothing.
  }

  try {
    if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
      result = globalThis.crypto.randomUUID();
    }
  } catch {
    // Do nothing.
  }

  try {
    if (typeof require === "function") {
      result = require("node:crypto").randomUUID();
    }
  } catch {
    // Do nothing.
  }

  if (result === undefined) {
    throw new Error("Unable to generate UUID");
  } else {
    return result;
  }
}
