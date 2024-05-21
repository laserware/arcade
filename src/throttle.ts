import type { AnyFunc } from "./types.js";

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `delay` milliseconds (or once per browser frame). See
 * {@link https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/|debounce vs throttle}
 * for additional details.
 *
 * @param func Function to throttle.
 * @param delay Delay in milliseconds.
 */
export function throttle(func: AnyFunc, delay: number): AnyFunc {
  let shouldWait = false;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function for throttle");
  }

  return (...args) => {
    if (shouldWait) {
      return;
    }

    func(...args);

    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}
