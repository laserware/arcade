// noinspection SpellCheckingInspection

/*
 * MIT License
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This was taken from the [camelcase](https://github.com/sindresorhus/camelcase) package.
 * Type annotations were added and options were removed.
 */

const REG_EXP_UPPERCASE = /[\p{Lu}]/u;
const REG_EXP_LOWERCASE = /[\p{Ll}]/u;
const REG_EXP_IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const REG_EXP_SEPARATORS = /[_.\- ]+/;

const REG_EXP_LEADING_SEPARATORS = new RegExp("^" + REG_EXP_SEPARATORS.source);
// prettier-ignore
const REG_EXP_SEPARATORS_AND_IDENTIFIER = new RegExp(REG_EXP_SEPARATORS.source + REG_EXP_IDENTIFIER.source, "gu");
// prettier-ignore
const REG_EXP_NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + REG_EXP_IDENTIFIER.source, "gu");

/**
 * Transforms the specified string value to camelCase.
 *
 * @param value Value to transform.
 *
 * @returns The specified `value` converted to camelCase.
 *
 * @throws [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if the value is not a string.
 *
 * @category String
 */
export function camelCase(value: string): string {
  // noinspection SuspiciousTypeOfGuard
  if (typeof value !== "string") {
    throw new TypeError("Expected the value to be string");
  }

  let casedValue = value.trim();

  if (casedValue.length === 0) {
    return "";
  }

  if (casedValue.length === 1) {
    if (REG_EXP_SEPARATORS.test(casedValue)) {
      return "";
    }
  }

  const hasUpperCase = casedValue !== casedValue.toLowerCase();

  if (hasUpperCase) {
    casedValue = preserveCamelCase(casedValue);
  }

  casedValue = casedValue.replace(REG_EXP_LEADING_SEPARATORS, "");
  casedValue = casedValue.toLowerCase();

  return postProcess(casedValue);
}

function preserveCamelCase(value: string): string {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let index = 0; index < value.length; index++) {
    const character = value[index];

    if (isLastCharLower && REG_EXP_UPPERCASE.test(character)) {
      value = value.slice(0, index) + "-" + value.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;

      index++;

      continue;
    }

    /* istanbul ignore next -- @preserve: Vendored, no need to test. */
    // prettier-ignore
    if (isLastCharUpper && isLastLastCharUpper && REG_EXP_LOWERCASE.test(character)) {
      value = value.slice(0, index - 1) + "-" + value.slice(index - 1);

      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;

      continue;
    }

    isLastCharLower =
      character.toLowerCase() === character &&
      character.toUpperCase() !== character;

    isLastLastCharUpper = isLastCharUpper;

    isLastCharUpper =
      character.toUpperCase() === character &&
      character.toLowerCase() !== character;
  }

  return value;
}

/* istanbul ignore next -- @preserve: Vendored, no need to test. */
function postProcess(value: string): string {
  REG_EXP_SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  REG_EXP_NUMBERS_AND_IDENTIFIER.lastIndex = 0;

  return value
    .replaceAll(REG_EXP_NUMBERS_AND_IDENTIFIER, (match, pattern, offset) =>
      ["_", "-"].includes(value.charAt(offset + match.length))
        ? match
        : match.toUpperCase(),
    )
    .replaceAll(REG_EXP_SEPARATORS_AND_IDENTIFIER, (match, identifier) =>
      identifier.toUpperCase(),
    );
}
