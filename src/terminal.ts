/*
 * ISC License
 *
 * Copyright (c) 2021-2024 Oleksii Raspopov, Kostiantyn Denysov, Anton Verinov
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * This code was taken from the [picocolors](https://github.com/alexeyraspopov/picocolors)
 * repository on GitHub. It was adjusted to use TypeScript and the variables/exports
 * were renamed.
 */
import { isNotNil } from "./isNotNil.js";
import { isRuntime } from "./runtime.js";

let areTerminalStylesEnabled = false;

/**
 * Callback that takes an `input` string and returns the result with formatting
 * applied.
 *
 * @param input Value to style.
 *
 * @returns Input with style modifiers.
 *
 * @category Terminal
 */
export type TerminalStyleFormatter = (input: string) => string;

/**
 * Terminal style that can be applied to a string before logging.
 *
 * @category Terminal
 */
// prettier-ignore
export type TerminalStyle =
  | "reset"
  // Text Decoration:
  | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough"
  // Foreground:
  | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray"
  // Background:
  | "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite"
  // Foreground (Bright):
  | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright"
  | "magentaBright" | "cyanBright" | "whiteBright"
  // Background (Bright):
  | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright"
  | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";

/**
 * Object with key of terminal style and value of the corresponding formatter
 * callback to apply style to an input.
 *
 * @category Terminal
 */
export type TerminalStyles = Record<TerminalStyle, TerminalStyleFormatter>;

/**
 * Object with terminal style formatters. Use this if you don't need to
 * programmatically set whether terminal styles should be enabled.
 *
 * @category Terminal
 */
export const terminalStyles = createTerminalStyles();

/**
 * Creates a terminal styles formatter object dynamically and returns an object
 * with formatter functions for applying formatting to an input. This is
 * provided in the event that you need to explicitly enable or disable terminal
 * colors programmatically.
 *
 * @param enabled If `true`, use styles, otherwise ignore.
 *
 * @returns Object with key of terminal style and value of the corresponding formatter
 *          callback to apply style to an input.
 *
 * @category Terminal
 */
export function createTerminalStyles(
  enabled = isColorSupported(),
): TerminalStyles {
  const formatter = enabled ? getFormatter : () => String;

  areTerminalStylesEnabled = enabled;

  return {
    reset: formatter("\x1b[0m", "\x1b[0m"),
    bold: formatter("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"),
    dim: formatter("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
    italic: formatter("\x1b[3m", "\x1b[23m"),
    underline: formatter("\x1b[4m", "\x1b[24m"),
    inverse: formatter("\x1b[7m", "\x1b[27m"),
    hidden: formatter("\x1b[8m", "\x1b[28m"),
    strikethrough: formatter("\x1b[9m", "\x1b[29m"),

    black: formatter("\x1b[30m", "\x1b[39m"),
    red: formatter("\x1b[31m", "\x1b[39m"),
    green: formatter("\x1b[32m", "\x1b[39m"),
    yellow: formatter("\x1b[33m", "\x1b[39m"),
    blue: formatter("\x1b[34m", "\x1b[39m"),
    magenta: formatter("\x1b[35m", "\x1b[39m"),
    cyan: formatter("\x1b[36m", "\x1b[39m"),
    white: formatter("\x1b[37m", "\x1b[39m"),
    gray: formatter("\x1b[90m", "\x1b[39m"),

    bgBlack: formatter("\x1b[40m", "\x1b[49m"),
    bgRed: formatter("\x1b[41m", "\x1b[49m"),
    bgGreen: formatter("\x1b[42m", "\x1b[49m"),
    bgYellow: formatter("\x1b[43m", "\x1b[49m"),
    bgBlue: formatter("\x1b[44m", "\x1b[49m"),
    bgMagenta: formatter("\x1b[45m", "\x1b[49m"),
    bgCyan: formatter("\x1b[46m", "\x1b[49m"),
    bgWhite: formatter("\x1b[47m", "\x1b[49m"),

    blackBright: formatter("\x1b[90m", "\x1b[39m"),
    redBright: formatter("\x1b[91m", "\x1b[39m"),
    greenBright: formatter("\x1b[92m", "\x1b[39m"),
    yellowBright: formatter("\x1b[93m", "\x1b[39m"),
    blueBright: formatter("\x1b[94m", "\x1b[39m"),
    magentaBright: formatter("\x1b[95m", "\x1b[39m"),
    cyanBright: formatter("\x1b[96m", "\x1b[39m"),
    whiteBright: formatter("\x1b[97m", "\x1b[39m"),

    bgBlackBright: formatter("\x1b[100m", "\x1b[49m"),
    bgRedBright: formatter("\x1b[101m", "\x1b[49m"),
    bgGreenBright: formatter("\x1b[102m", "\x1b[49m"),
    bgYellowBright: formatter("\x1b[103m", "\x1b[49m"),
    bgBlueBright: formatter("\x1b[104m", "\x1b[49m"),
    bgMagentaBright: formatter("\x1b[105m", "\x1b[49m"),
    bgCyanBright: formatter("\x1b[106m", "\x1b[49m"),
    bgWhiteBright: formatter("\x1b[107m", "\x1b[49m"),
  };
}

/**
 * Checks if terminal styles are supported.
 *
 * This should only be used for testing purposes.
 *
 * @internal
 */
export function isUsingTerminalStyles(): boolean {
  return areTerminalStylesEnabled;
}

/**
 * Returns the formatter function used to format the log message.
 */
function getFormatter(
  open: string,
  close: string,
  replace: string = open,
): TerminalStyleFormatter {
  return (input: string): string => {
    const string = "" + input;
    const index = string.indexOf(close, open.length);

    return ~index
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close;
  };
}

function replaceClose(
  value: string,
  close: string,
  replace: string,
  index: number,
): string {
  let result = "";
  let cursor = 0;

  do {
    result += value.substring(cursor, index) + replace;
    cursor = index + close.length;
    index = value.indexOf(close, cursor);
  } while (~index);

  return result + value.substring(cursor);
}

function isColorSupported(): boolean {
  if (isRuntime("browser") || isRuntime("worker")) {
    return true;
  }

  const nodeProcess = process ?? {};
  const env: Record<string, any> = nodeProcess.env ?? {};
  const argv = nodeProcess.argv ?? [];
  const isTTY = (nodeProcess.stdout ?? {}).isTTY;

  switch (true) {
    case (env.NO_COLOR ?? "") !== "":
    case argv.includes("--no-color"):
      return false;

    case isNotNil(env.FORCE_COLOR):
    case argv.includes("--color"):
    case nodeProcess.platform === "win32":
    case isTTY && env.TERM !== "dumb":
    case isNotNil(env.CI):
      return true;

    default:
      return false;
  }
}
