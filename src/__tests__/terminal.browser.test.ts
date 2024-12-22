// @vitest-environment jsdom

import { areTerminalColorsSupported } from "../terminal.js";

describe("within terminal for the browser", () => {
  it("colors are always supported", () => {
    expect(areTerminalColorsSupported()).toBe(true);
  });
});
