/*
 * MIT License
 *
 * Copyright (c) 2017 Evgeny Poberezkin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This code was taken from the [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)
 * repository on GitHub.
 *
 * The code was refactored to use more descriptive variable names, types were
 * added, and the formatting was tweaked.
 */

import { isNotNil } from "./isNotNil.js";

/**
 * Returns true if the specified `left` and `right` values are deeply equal.
 *
 * @remarks
 * This function was taken from the [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) library.
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
export function isEqual(left: any, right: any): boolean {
  if (left === right) {
    return true;
  }

  const areBothObjects =
    isNotNil(left) &&
    isNotNil(right) &&
    typeof left === "object" &&
    typeof right === "object";

  if (areBothObjects) {
    let length: number;
    let index: any;

    if (Array.isArray(left)) {
      length = left.length;
      if (length !== right.length) {
        return false;
      }

      for (index = length; index-- !== 0; ) {
        if (!isEqual(left[index], right[index])) {
          return false;
        }
      }

      return true;
    }

    if (left instanceof Map && right instanceof Map) {
      if (left.size !== right.size) {
        return false;
      }

      for (index of left.entries()) {
        if (!right.has(index[0])) {
          return false;
        }
      }

      for (index of left.entries()) {
        if (!isEqual(index[1], right.get(index[0]))) {
          return false;
        }
      }

      return true;
    }

    if (left instanceof Set && right instanceof Set) {
      if (left.size !== right.size) {
        return false;
      }

      for (index of left.entries()) {
        if (!right.has(index[0])) {
          return false;
        }
      }

      return true;
    }

    if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
      length = left.byteLength;
      if (length !== right.byteLength) {
        return false;
      }
      for (index = length; index-- !== 0; ) {
        // @ts-ignore
        if (left[index] !== right[index]) {
          return false;
        }
      }
      return true;
    }

    if (left.constructor === RegExp) {
      return left.source === right.source && left.flags === right.flags;
    }
    if (left.valueOf !== Object.prototype.valueOf) {
      return left.valueOf() === right.valueOf();
    }
    if (left.toString !== Object.prototype.toString) {
      return left.toString() === right.toString();
    }

    const keys = Object.keys(left) as string[];
    length = keys.length;

    if (length !== Object.keys(right).length) {
      return false;
    }

    for (index = length; index-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(right, keys[index])) {
        return false;
      }
    }

    for (index = length; index-- !== 0; ) {
      const key = keys[index];

      if (!isEqual(left[key], right[key])) {
        return false;
      }
    }
  }

  // Return true if both NaN, false otherwise:
  // biome-ignore lint/suspicious/noSelfCompare: Copied fom source
  return left !== left && right !== right;
}
