/*
 * The MIT License
 *
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 *
 * Based on Underscore.js, copyright Jeremy Ashkenas,
 * DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
 *
 * This software consists of voluntary contributions made by many
 * individuals. For exact contribution history, see the revision history
 * available at https://github.com/lodash/lodash
 *
 * The following license applies to all parts of this software except as
 * documented below:
 *
 * ====
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * ====
 *
 * Copyright and related rights for sample code are waived via CC0. Sample
 * code is defined as all source code displayed within the prose of the
 * documentation.
 *
 * CC0: http://creativecommons.org/publicdomain/zero/1.0/
 *
 * ====
 *
 * Files located in the node_modules and vendor directories are externally
 * maintained libraries used by this software which have their own
 * licenses; we recommend you read them, as their terms may differ from the
 * terms above.
 */

/**
 * Clamps specified value within the inclusive lower and upper bounds.
 * Taken from the [clamp](https://github.com/lodash/lodash/blob/main/src/clamp.ts)
 * implementation in lodash.
 *
 * @param value Value being clamped.
 * @param lower Lower bounds for the value.
 * @param upper Upper bounds for the value.
 *
 * @example
 * clamp(-10, -5, 5);
 * // -5
 *
 * clamp(10, -5, 5)
 * // 5
 *
 * @returns The clamped `value` within the specified bounds.
 *
 * @category Number
 */
export function clamp(value: number, lower: number, upper: number): number {
  let clampedValue = Number(value);
  let validLower = Number(lower);
  let validUpper = Number(upper);

  validLower = validLower === validLower ? validLower : 0;
  validUpper = validUpper === validUpper ? validUpper : 0;

  if (clampedValue === clampedValue) {
    clampedValue = clampedValue <= validUpper ? clampedValue : validUpper;
    clampedValue = clampedValue >= validLower ? clampedValue : validLower;
  }

  return clampedValue;
}
