import { isNil } from "./isNil";

/**
 * Returns true if the specified value is not null and not undefined.
 * @param value Value to check
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}
