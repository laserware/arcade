// @vitest-environment jsdom

import { createTerminalStyles, isUsingTerminalStyles } from "../terminal.js";

describe("within terminal for the browser", () => {
  it("colors are always supported", () => {
    createTerminalStyles();

    expect(isUsingTerminalStyles()).toBe(true);
  });
});
