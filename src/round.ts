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
 *
 * This was taken from the [round](https://github.com/lodash/lodash/blob/11eb817cdfacf56c02d7005cbe520ffbeb0fe59a/round.js)
 * implementation in the lodash GitHub repository.
 */

/**
 * Rounds the specified `value` to the specified `precision`.
 *
 * @param value The number to round.
 * @param [precision=0] The precision to round to.
 *
 * @returns Number rounded to the specified `precision`.
 *
 * @example
 * round(4.006);
 * // 4
 *
 * round(4.006, 2);
 * // 4.01
 *
 * round(4060, -2);
 * // 4100
 *
 * @category Number
 */
export function round(value: number, precision = 0): number {
  const validPrecision =
    precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292);

  if (validPrecision !== 0) {
    // Shift with exponential notation to avoid floating-point issues.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#examples for more details.
    let pair = `${value}e`.split("e");

    const numberToRound = `${pair[0]}e${+pair[1] + validPrecision}`;
    const result = Math.round(numberToRound as unknown as number);

    pair = `${result}e`.split("e");

    return +`${pair[0]}e${+pair[1] - validPrecision}`;
  } else {
    return Math.round(value);
  }
}
