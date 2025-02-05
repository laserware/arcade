import {
  isArrayOf,
  isBoolean,
  isFunction,
  isNumber,
  isObjectLiteral,
  isString,
  isValidNumber,
} from "./is.js";
import { isEmpty } from "./isEmpty.js";
import { isEqual } from "./isEqual.js";
import { isNil } from "./isNil.js";
import { isNotNil } from "./isNotNil.js";

export { appendToGroup } from "./appendToGroup.js";
export { asNumber } from "./asNumber.js";
export { camelCase } from "./camelCase.js";
export { capitalize } from "./capitalize.js";
export { cast } from "./cast.js";
export { clamp } from "./clamp.js";
export { dateFormat, type DateFormatMaskOption } from "./dateFormat.js";
export { debounce } from "./debounce.js";
export { dedent, type Dedent } from "./dedent.js";
export { entriesOf } from "./entriesOf.js";
export { joinFilePath, splitFilePath } from "./filePaths.js";
export { groupBy, type Iteratee } from "./groupBy.js";
export { gte } from "./gte.js";
export {
  isArrayOf,
  isBoolean,
  isFunction,
  isNumber,
  isObjectLiteral,
  isString,
  isValidNumber,
} from "./is.js";
export { isEmpty } from "./isEmpty.js";
export { isEqual } from "./isEqual.js";
export { isNil } from "./isNil.js";
export { isNotNil } from "./isNotNil.js";
export { isPlainObject } from "./isPlainObject.js";
export { kebabCase } from "./kebabCase.js";
export { keyBy } from "./keyBy.js";
export { keysOf } from "./keysOf.js";
export { lte } from "./lte.js";
export { merge, mergeAll, type Mergeable } from "./merge.js";
export { noop } from "./noop.js";
export { omit } from "./omit.js";
export { pause } from "./pause.js";
export { getPlatform, isPlatform, type Platform } from "./platform.js";
export { randomNumber } from "./randomNumber.js";
export { removeAtIndex } from "./removeAtIndex.js";
export { round } from "./round.js";
export { getRuntime, isRunningIn, isRuntime, type Runtime } from "./runtime.js";
export { searchWithin } from "./searchWithin.js";
export { sortBy } from "./sortBy.js";
export { sumBy } from "./sumBy.js";
export {
  createTerminalStyles,
  terminalStyles,
  type TerminalStyle,
  type TerminalStyleFormatter,
  type TerminalStyles,
} from "./terminal.js";
export { throttle } from "./throttle.js";
export { toBoolean } from "./toBoolean.js";
export { toEntries } from "./toEntries.js";
export { toNumber } from "./toNumber.js";
export { toReversed } from "./toReversed.js";
export { toSorted } from "./toSorted.js";
export { uniq } from "./uniq.js";
export {
  TypedEventTarget,
  type TypedEventListener,
  type TypedEventListenerObject,
  type TypedEventListenerOrEventListenerObject,
} from "./TypedEventTarget.js";
export { uuid } from "./uuid.js";

/**
 * Object with all is available (useful for checking for multiple conditions
 * in the same file).
 *
 * @category Utility
 */
export const is = {
  /**
   * Returns true if the specified `value` is a array of the specified type `T`.
   */
  arrayOf<T>(value: unknown, predicate: (value: any) => boolean): value is T[] {
    return isArrayOf(value, predicate);
  },
  /**
   * Returns true if the specified `value` is a boolean. See {@linkcode isBoolean}.
   */
  boolean: isBoolean,
  /**
   * Returns true if the specified `value` is a function. See {@linkcode isFunction}.
   */
  function: isFunction,
  /**
   * Returns true if the specified `value` is a number. See {@linkcode isNumber}.
   */
  number: isNumber,
  /**
   * Returns true if the specified `value` is an object literal. See {@linkcode isObjectLiteral}.
   */
  objectLiteral: isObjectLiteral,
  /**
   * Returns true if the specified `value` is a string. See {@linkcode isString}.
   */
  string: isString,
  /**
   * Returns true if the specified `value` is a *valid* number (i.e. not `NaN`). See {@linkcode isValidNumber}.
   */
  validNumber: isValidNumber,
  /**
   * Returns true if the specified `value` is empty. See {@linkcode isEmpty}.
   */
  empty: isEmpty,
  /**
   * Returns true if the specified values are equal. See {@linkcode isEqual}.
   */
  equal: isEqual,
  /**
   * Returns true if the specified `value` is `null` or `undefined`.
   * See {@linkcode isNil}.
   */
  nil: isNil,
  /**
   * Returns true if the specified `value` is *not* `null` or `undefined`.
   * See {@linkcode isNotNil}.
   */
  notNil: isNotNil,
};

export type {
  AnyDict,
  AnyFunc,
  Dict,
  DictKey,
  KeysOf,
  Maybe,
  OneOrManyOf,
  Primitive,
  WithNullValues,
  WithUndefinedValues,
} from "./types.js";
