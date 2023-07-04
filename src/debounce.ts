import type { AnyFunc } from "./types.js";

/**
 * Creates a debounced function that only invokes `func` at most once per
 * every `delay` milliseconds (or once per browser frame).
 * @see https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/
 */
export function debounce(func: AnyFunc, delay: number): AnyFunc {
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
}
