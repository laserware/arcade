/**
 * Checks if the specified `value` is a plain object.
 *
 * @param value Value to check if plain object.
 *
 * @returns `true` if the `value` is a plain object.
 *
 * @category Utility
 *
 * @deprecated Use {@linkcode isObjectLiteral} or {@linkcode is.objectLiteral} instead.
 */
export function isPlainObject(value: any): value is Record<any, any> {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  return Object.getPrototypeOf(value) === Object.prototype;
}
