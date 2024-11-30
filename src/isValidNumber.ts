/**
 * Returns true if the specified value is a valid number.
 *
 * @param value Value to check if valid number.
 *
 * @category Number
 */
export const isValidNumber = (value: unknown): value is number => {
  if (typeof value === "number") {
    return true;
  }

  if (typeof value === "string") {
    return false;
  }

  return !Number.isNaN(Number(value));
};
