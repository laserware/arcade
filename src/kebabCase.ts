// noinspection SpellCheckingInspection

/*
 * MIT License
 *
 * Copyright (c) 2015 Joakim Carlstein
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This was taken from the [kebab-case](https://github.com/joakimbeng/kebab-case)
 * repository on GitHub.
 */

/**
 * Converts the specified `value` to `kebab-case`.
 *
 * @param value Value to convert to `kebab-case`.
 *
 * @returns The specified `value` in `kebab-case`.
 *
 * @category String
 */
export function kebabCase(value: string): string {
  const KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

  // If the value has any spaces, replace spaces with "-" and ensure the entire
  // value is lowercase:
  if (/\s/gi.test(value)) {
    return value.replaceAll(" ", "-").toLowerCase();
  }

  return (
    // biome-ignore format: Ignore
    value
      // Ensure that the first letter is lowercase; otherwise an additional
      // "-" is added to the front of the string:
      .charAt(0).toLowerCase().concat(value.slice(1))
      // Replace words that start with a capital letter with `-<first letter>`:
      .replace(KEBAB_REGEX, (match) => `-${match.toLowerCase()}`)
  );
}
