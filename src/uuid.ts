// prettier-ignore
const isNode = typeof window === "undefined" || typeof window?.crypto === "undefined";

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
  if (isNode) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("crypto").randomUUID();
  }

  if (typeof window !== "undefined") {
    return window.crypto.randomUUID();
  }

  throw new Error("Unable to generate UUID");
};
