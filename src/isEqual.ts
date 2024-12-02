/* istanbul ignore file -- @preserve: Since this is a forwarded export, we're skipping tests. */

import { deepEqual } from "fast-equals";

/**
 * Returns true if the specified `left` and `right` values are deeply equal.
 *
 * @remarks
 * This function is a forwarded export of the [`deepEqual` function from the `fast-equals`](https://github.com/planttheidea/fast-equals/blob/master/README.md#deepequal)
 * library.
 *
 * @template L Type of the `left` value.
 * @template R Type of the `right` value.
 *
 * @param left Left value to check for equality.
 * @param right Right value to check for equality.
 *
 * @returns `true` if both values are deeply equal.
 *
 * @category Object
 */
export function isEqual<L, R>(left: L, right: R): boolean {
  return deepEqual<L, R>(left, right);
}
