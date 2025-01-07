import { describe, expect, it, mock } from "bun:test";

import { throttle } from "../throttle.js";

describe("the throttle function", () => {
  it("calls the function immediately on first call", () => {
    const func = mock();
    const throttledFunc = throttle(func, 1_000);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("does not call the function again before the delay", () => {
    const func = mock();

    const throttledFunc = throttle(func, 1_000);

    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("calls the function again after the delay", async () => {
    const func = mock();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setTimeout(resolve, 150));

    throttledFunc();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it("throws a TypeError if not provided with a function", () => {
    expect(() => {
      // @ts-expect-error intentionally passing incorrect type for test
      throttle(null, 1_000);
    }).toThrow(TypeError);
  });
});
