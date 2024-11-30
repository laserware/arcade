import type { AnyFunc } from "./types.js";

/**
 * Creates a debounced function that only invokes `func` at most once per
 * every `delay` milliseconds (or once per browser frame).
 *
 * See [this article](https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/) for
 * additional details.
 *
 * @param func Function to debounce.
 * @param delay Delay in milliseconds.
 *
 * @returns The debounced function.
 *
 * @category Function
 */
export const debounce = (func: AnyFunc, delay: number): AnyFunc => {
  let timeout: NodeJS.Timeout | number;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function for debounce");
  }

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
