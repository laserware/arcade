// prettier-ignore
const isNode = typeof window === "undefined" || typeof window?.crypto === "undefined";

/**
 * Returns a V4 UUID either in the Node.js or browser context based on the
 * environment.
 */
export function uuid(): string {
  if (isNode) {
    return require("crypto").randomUUID();
  }

  if (typeof window !== "undefined") {
    return window.crypto.randomUUID();
  }

  throw new Error("Unable to generate UUID");
}
