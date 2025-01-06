import {
  areTerminalColorsSupported,
  createTerminalStyles,
} from "../terminal.js";

const formats = {
  reset: ["\x1b[0m", "\x1b[0m"],
  bold: ["\x1b[1m", "\x1b[22m"],
  dim: ["\x1b[2m", "\x1b[22m"],
  italic: ["\x1b[3m", "\x1b[23m"],
  underline: ["\x1b[4m", "\x1b[24m"],
  inverse: ["\x1b[7m", "\x1b[27m"],
  hidden: ["\x1b[8m", "\x1b[28m"],
  strikethrough: ["\x1b[9m", "\x1b[29m"],
  black: ["\x1b[30m", "\x1b[39m"],
  red: ["\x1b[31m", "\x1b[39m"],
  green: ["\x1b[32m", "\x1b[39m"],
  yellow: ["\x1b[33m", "\x1b[39m"],
  blue: ["\x1b[34m", "\x1b[39m"],
  magenta: ["\x1b[35m", "\x1b[39m"],
  cyan: ["\x1b[36m", "\x1b[39m"],
  white: ["\x1b[37m", "\x1b[39m"],
  gray: ["\x1b[90m", "\x1b[39m"],
  bgBlack: ["\x1b[40m", "\x1b[49m"],
  bgRed: ["\x1b[41m", "\x1b[49m"],
  bgGreen: ["\x1b[42m", "\x1b[49m"],
  bgYellow: ["\x1b[43m", "\x1b[49m"],
  bgBlue: ["\x1b[44m", "\x1b[49m"],
  bgMagenta: ["\x1b[45m", "\x1b[49m"],
  bgCyan: ["\x1b[46m", "\x1b[49m"],
  bgWhite: ["\x1b[47m", "\x1b[49m"],
  blackBright: ["\x1b[90m", "\x1b[39m"],
  redBright: ["\x1b[91m", "\x1b[39m"],
  greenBright: ["\x1b[92m", "\x1b[39m"],
  yellowBright: ["\x1b[93m", "\x1b[39m"],
  blueBright: ["\x1b[94m", "\x1b[39m"],
  magentaBright: ["\x1b[95m", "\x1b[39m"],
  cyanBright: ["\x1b[96m", "\x1b[39m"],
  whiteBright: ["\x1b[97m", "\x1b[39m"],
  bgBlackBright: ["\x1b[100m", "\x1b[49m"],
  bgRedBright: ["\x1b[101m", "\x1b[49m"],
  bgGreenBright: ["\x1b[102m", "\x1b[49m"],
  bgYellowBright: ["\x1b[103m", "\x1b[49m"],
  bgBlueBright: ["\x1b[104m", "\x1b[49m"],
  bgMagentaBright: ["\x1b[105m", "\x1b[49m"],
  bgCyanBright: ["\x1b[106m", "\x1b[49m"],
  bgWhiteBright: ["\x1b[107m", "\x1b[49m"],
};

const styles = createTerminalStyles(true);

describe("within terminal", () => {
  describe("when running in different environments", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("enables colors on a CI server", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, TERM: "dumb", CI: "1" },
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("enables colors when --color arg is specified", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, TERM: "dumb" },
        argv: ["--color"],
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    // FIXME: This test is broken.
    it("enables colors when env.NO_COLOR is empty", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, NO_COLOR: "", CI: process.env.CI },
        argv: ["--color"],
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("enables colors when env.FORCE_COLOR is specified", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, TERM: "dumb", FORCE_COLOR: "1" },
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("enables colors when running on Windows", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, TERM: "dumb" },
        platform: "win32",
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("enables colors when running on edge runtime", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, FORCE_COLOR: "1" },
        argv: undefined,
        require: undefined,
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("disables colors when --no-color arg is specified", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, FORCE_COLOR: "1" },
        argv: ["--no-color"],
      });

      expect(areTerminalColorsSupported()).toBeFalsy();
    });

    it("disables colors when env.NO_COLOR is specified", () => {
      vi.stubGlobal("process", {
        env: { ...process.env, FORCE_COLOR: "1", NO_COLOR: "1" },
      });

      expect(areTerminalColorsSupported()).toBeFalsy();
    });

    it("disables colors when only dumb terminal available", () => {
      vi.stubGlobal("process", {
        env: { TERM: "dumb" },
        stdout: { isTTY: false },
        argv: [],
      });

      expect(areTerminalColorsSupported()).toBeFalsy();
    });

    it("enables colors when is TTY and not dumb terminal", () => {
      vi.stubGlobal("process", {
        env: { TERM: "" },
        stdout: { isTTY: true },
        argv: [],
      });

      expect(areTerminalColorsSupported()).toBeTruthy();
    });

    it("disables colors when environment is not available", () => {
      vi.stubGlobal("process", { env: undefined });

      expect(areTerminalColorsSupported()).toBeFalsy();
    });
  });

  describe("the terminalStyles object", () => {
    it.concurrent.each(
      // biome-ignore format:
      Object.entries(styles).map(([name, formatter]) => ({ name, formatter })),
    )("applies $name style to input text", async ({ formatter }) => {
      const result = formatter("Test");

      expect(/\[(\d*)m/.test(result)).toBeTruthy();
    });

    it.concurrent.each(
      Object.entries(formats).map(([name, codes]) => ({ name, codes })),
    )("wraps input with correct codes for $name", async ({ name, codes }) => {
      // @ts-ignore
      const result = styles[name]("string");

      // biome-ignore lint/style/useTemplate: <explanation>
      expect(result).toBe(codes[0] + "string" + codes[1]);
    });

    it("handles color nesting", () => {
      const result = styles.bold(
        `BOLD ${styles.red(`RED ${styles.dim("DIM")} RED`)} BOLD`,
      );

      const expected = [
        formats.bold[0],
        "BOLD ",
        formats.red[0],
        "RED ",
        formats.dim[0],
        "DIM",
        formats.dim[1],
        formats.bold[0],
        " RED",
        formats.red[1],
        " BOLD",
        formats.bold[1],
      ].join("");

      expect(result).toBe(expected);
    });

    it("wraps the input properly", () => {
      const result = styles.red(styles.bold("==TEST=="));

      const expected = [
        formats.red[0],
        formats.bold[0],
        "==TEST==",
        formats.bold[1],
        formats.red[1],
      ].join("");

      expect(result).toBe(expected);
    });

    it("handles complex wrapping", () => {
      const result = styles.bold(
        styles.yellow(styles.bgRed(styles.italic("==TEST=="))),
      );

      const expected = [
        formats.bold[0],
        formats.yellow[0],
        formats.bgRed[0],
        formats.italic[0],
        "==TEST==",
        formats.italic[1],
        formats.bgRed[1],
        formats.yellow[1],
        formats.bold[1],
      ].join("");

      expect(result).toBe(expected);
    });

    // biome-ignore format:
    it.concurrent.each([
      {
        input: styles.red(`foo ${styles.yellow("bar")} baz`),
        expected: [formats.red[0], "foo ", formats.yellow[0], "bar", formats.red[0], " baz", formats.red[1]],
      },
      {
        input: styles.bold(`foo ${styles.red(styles.dim("bar"))} baz`),
        expected: [formats.bold[0], "foo ", formats.red[0], formats.dim[0], "bar", formats.dim[1], formats.bold[0], formats.red[1], " baz", formats.bold[1]],
      },
      {
        input: styles.yellow(`foo ${styles.red(styles.bold("red"))} bar ${styles.cyan("cyan")} baz`),
        expected: [formats.yellow[0], "foo ", formats.red[0], formats.bold[0], "red", formats.bold[1], formats.yellow[0], " bar ", formats.cyan[0], "cyan", formats.yellow[0], " baz", formats.yellow[1]],
      },
    ])("handles close sequence replacement for $input", async ({ input, expected }) => {
      expect(input).toBe(expected.join(""));
    });

    it.concurrent.each([
      // @ts-ignore
      {
        input: styles.red(),
        expected: `${formats.red[0]}undefined${formats.red[1]}`,
      },
      // @ts-ignore
      {
        input: styles.red(undefined),
        expected: `${formats.red[0]}undefined${formats.red[1]}`,
      },
      // @ts-ignore
      { input: styles.red(0), expected: `${formats.red[0]}0${formats.red[1]}` },
      // @ts-ignore
      {
        input: styles.red(Number.NaN),
        expected: `${formats.red[0]}NaN${formats.red[1]}`,
      },
      // @ts-ignore
      {
        input: styles.red(null),
        expected: `${formats.red[0]}null${formats.red[1]}`,
      },
      // @ts-ignore
      {
        input: styles.red(true),
        expected: `${formats.red[0]}true${formats.red[1]}`,
      },
      // @ts-ignore
      {
        input: styles.red(false),
        expected: `${formats.red[0]}false${formats.red[1]}`,
      },
      // @ts-ignore
      {
        input: styles.red(Number.POSITIVE_INFINITY),
        expected: `${formats.red[0]}Infinity${formats.red[1]}`,
      },
    ])(
      "handles non-string input when input is $input",
      ({ input, expected }) => {
        expect(input).toBe(expected);
      },
    );

    it("doesn't overflow when coloring already colored large text", () => {
      expect(() => {
        styles.blue(styles.red("x")).repeat(10_000);
      }).not.toThrow();
    });
  });

  describe("the createTerminalStyles function", () => {
    it.concurrent.each(
      // biome-ignore format:
      Object.entries(createTerminalStyles(true)).map(([name, formatter]) => ({ name, formatter })),
    )(
      "returns an object that applies $name style to input text with colors enabled",
      async ({ formatter }) => {
        const result = formatter("Test");

        expect(/\[(\d*)m/.test(result)).toBeTruthy();
      },
    );
  });

  it("does not apply style to input if colors are disabled", () => {
    const styles = createTerminalStyles(false);

    const result = styles.blue("Test");

    expect(/\[(\d*)m/.test(result)).toBeFalsy();
  });
});
