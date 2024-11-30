/* istanbul ignore file -- @preserve: Since this is vendored, we're skipping tests. */

/*
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Options for the {@linkcode dedent} function.
 */
interface DedentOptions {
  escapeSpecialCharacters?: boolean;
}

export interface Dedent {
  (literals: string): string;
  (strings: TemplateStringsArray, ...values: unknown[]): string;
  withOptions(options: DedentOptions): Dedent;
}

/**
 * Strips indentation from multi-line template strings. This code was
 * taken directly from the [dedent](https://github.com/dmnd/dedent) package.
 * Some variables names were changed and explicit type annotations were added.
 *
 * @returns Specified value with indentation removed.
 *
 * @category String
 */
export const dedent: Dedent = createDedent({});

/**
 * Returns an object that adheres to the {@linkcode Dedent} interface with the
 * specified `options`. See [dedent options](https://github.com/dmnd/dedent#options)
 * for additional details.
 *
 * @param options Options for the dedenter.
 */
function createDedent(options: DedentOptions): Dedent {
  dedent.withOptions = (newOptions: DedentOptions): Dedent =>
    createDedent({ ...options, ...newOptions });

  return dedent;

  function dedent(literals: string): string;
  function dedent(strings: TemplateStringsArray, ...values: unknown[]): string;
  function dedent(
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ): string {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const { escapeSpecialCharacters = Array.isArray(strings) } = options;

    // Perform interpolation:
    let result = "";
    for (let index = 0; index < raw.length; index++) {
      let next = raw[index];

      if (escapeSpecialCharacters) {
        // Handle escaped newlines, backticks, and interpolation characters:
        next = next
          .replace(/\\\n[ \t]*/g, "")
          .replace(/\\`/g, "`")
          .replace(/\\\$/g, "$")
          .replace(/\\\{/g, "{");
      }

      result += next;

      if (index < values.length) {
        result += values[index];
      }
    }

    // Strip indentation:
    const lines = result.split("\n");
    let indentStart: number | null = null;

    for (const line of lines) {
      const matches = line.match(/^(\s+)\S+/);

      if (matches !== null) {
        const indent = matches[1].length;

        if (indentStart === null) {
          // First indented line:
          indentStart = indent;
        } else {
          indentStart = Math.min(indentStart, indent);
        }
      }
    }

    if (indentStart !== null) {
      result = lines
        .map((line) =>
          line[0] === " " || line[0] === "\t" ? line.slice(indentStart) : line,
        )
        .join("\n");
    }

    // Dedent eats leading and trailing whitespace too:
    result = result.trim();
    if (escapeSpecialCharacters) {
      // Handle escaped newlines at the end to ensure they don't get stripped too:
      result = result.replace(/\\n/g, "\n");
    }

    return result;
  }
}
