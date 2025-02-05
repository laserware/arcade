/*
 * MIT License
 *
 * Copyright (c) 2012 James Halliday, Josh Duff, "TehShrike", and other contributors.
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
 * The merge code was taken from the [deepmerge](https://github.com/TehShrike/deepmerge)
 * repository on GitHub and the mergeable object check was taken from the
 * [is-mergeable-object](https://github.com/TehShrike/is-mergeable-object)
 * repository on GitHub. The code was heavily refactored and the `options`
 * object was removed.
 */

import { isNil } from "./isNil.js";
import type { OneOrManyOf } from "./types.js";

export type Mergeable = Record<any, any> | any[];

/**
 * Merges the specified `items` into a single item.
 *
 * Taken from [deepmerge](https://github.com/TehShrike/deepmerge) package.
 *
 * @template T Type of the target mergeable item.
 *
 * @param items Items to merge.
 *
 * @returns The merged object or array.
 *
 * @license MIT
 *
 * @category Object
 */
export function mergeAll<T extends Mergeable>(...items: T[]): T {
  return items.reduce((acc, next) => merge(acc, next), {}) as T;
}

/**
 * Merges the specified `source` into the specified `target` and returns the
 * result.
 *
 * Taken from [deepmerge](https://github.com/TehShrike/deepmerge) package.
 *
 * @template T Type of the target mergeable item.
 * @template S Type of the source mergeable item.
 *
 * @param target The target mergeable item.
 * @param source The source item with fields that will be merged into `target`.
 *
 * @returns The merged object or array.
 *
 * @license MIT
 *
 * @category Object
 */
export function merge<T extends Mergeable, S extends Mergeable = T>(
  target: T,
  source: S,
): T & S {
  const isTargetArray = Array.isArray(target);
  const isSourceArray = Array.isArray(source);

  if (isSourceArray !== isTargetArray) {
    return cloneValue<T & S>(source);
  }

  if (isSourceArray) {
    return mergeArray(target, source) as T & S;
  }

  return mergeObject(target, source) as T & S;
}

function mergeArray(target: Mergeable, source: Mergeable): Mergeable[] {
  return target.concat(source).map((element: Mergeable) => cloneValue(element));
}

function mergeObject(
  target: Record<any, any>,
  source: Record<any, any>,
): Record<any, any> {
  const destination: Record<string, any> = {};

  if (isMergeableObject(target)) {
    for (const key of getKeys(target)) {
      // @ts-ignore
      destination[key] = cloneValue(target[key]);
    }
  }

  for (const key of getKeys(source)) {
    // TODO: Find out a way to test this, I'm not sure what to do here.
    if (isPropertyUnsafe(target, key)) {
      continue;
    }

    if (isPropertyInObject(target, key) && isMergeableObject(source[key])) {
      // @ts-ignore
      destination[key] = merge(target[key], source[key]);
    } else {
      destination[key] = cloneValue(source[key]);
    }
  }

  return destination;
}

function cloneValue<T>(value: any): T {
  if (isMergeableObject(value)) {
    return merge(emptyTarget(value), value) as T;
  } else {
    return value;
  }
}

/**
 * Checks if the specified value can be merged.
 *
 * Taken from [is-mergeable-object](https://github.com/TehShrike/is-mergeable-object)
 * package.
 *
 * @license MIT
 */
function isMergeableObject(value: any): value is Mergeable {
  if (isNil(value)) {
    return false;
  }

  const stringValue = Object.prototype.toString.call(value);

  // See https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25:
  const isReactElement = value.$$typeof === Symbol.for("react.element");

  const isSpecial =
    stringValue === "[object RegExp]" ||
    stringValue === "[object Date]" ||
    isReactElement;

  return typeof value === "object" && !isSpecial;
}

function emptyTarget(value: OneOrManyOf<Mergeable>): Mergeable {
  return Array.isArray(value) ? [] : {};
}

function getEnumerableOwnPropertySymbols(target: any): string[] {
  // Note that the original implementation had a check to ensure `getOwnPropertySymbols`
  // was defined on `Object`, but this has been supported in browsers and
  // Node.js since 2015.
  const symbols = Object.getOwnPropertySymbols(target).filter((symbol) =>
    Object.propertyIsEnumerable.call(target, symbol),
  );

  return symbols as unknown as string[];
}

function getKeys(target: Mergeable): string[] {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function isPropertyInObject(
  object: Record<any, any>,
  property: string,
): boolean {
  try {
    return property in object;
  } catch {
    return false;
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function isPropertyUnsafe(target: Record<any, any>, key: string): boolean {
  // Properties are safe to merge if they don't exist in the target yet:
  if (!isPropertyInObject(target, key)) {
    return false;
  }

  // Unsafe if they exist up the prototype chain:
  const isOnPrototypeChain =
    Object.hasOwnProperty.call(target, key) &&
    Object.propertyIsEnumerable.call(target, key);

  return !isOnPrototypeChain;
}
