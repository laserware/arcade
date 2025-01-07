import { describe, expect, it, mock } from "bun:test";

import { debounce } from "../debounce.js";

describe("the debounce function", () => {
  it("should call the function after the specified delay", async () => {
    const func = mock();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(func).toHaveBeenCalled();
  });

  it("should not call the function if invoked again within the delay period", async () => {
    const func = mock();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc();
    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 110));
    expect(func).toHaveBeenCalled();
  });

  it("should call the function with the correct arguments", async () => {
    const func = mock();
    const debouncedFunc = debounce(func, 100);

    debouncedFunc(1, 2, 3);
    await new Promise((resolve) => setTimeout(resolve, 110));

    expect(func).toHaveBeenCalledWith(1, 2, 3);
  });

  it("should throw an error when func is not a function", () => {
    // @ts-expect-error Testing with invalid argument type
    expect(() => debounce(null, 100)).toThrow(TypeError);
  });

  it("should handle rapid multiple calls correctly", async () => {
    const func = mock();
    const debouncedFunc = debounce(func, 50);

    debouncedFunc();
    await new Promise((resolve) => setTimeout(resolve, 25));

    debouncedFunc();
    await new Promise((resolve) => setTimeout(resolve, 25));

    debouncedFunc();
    await new Promise((resolve) => setTimeout(resolve, 60));

    expect(func).toHaveBeenCalled();
  });
});
