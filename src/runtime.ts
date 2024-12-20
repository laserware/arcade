/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2023 Dinesh Pandiyan <flexdinesh@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Taken from the [browser-or-node](https://github.com/flexdinesh/browser-or-node)
 * repository on GitHub. The code was refactored and comments were added.
 */

/* istanbul ignore file -- @preserve: Functions are based on environment, which is tricky to mock. */

import { isNotNil } from "./isNotNil.js";

/**
 * Checks if currently running in a browser environment.
 *
 * @returns `true` if the program is running in browser.
 *
 * @category Utility
 */
export function isBrowser(): boolean {
  // For Electron:
  if (typeof process !== "undefined" && "type" in process) {
    return process.type === "renderer";
  }

  return typeof window !== "undefined";
}

/**
 * Checks if currently running in a WebWorker environment.
 *
 * @returns `true` if the program is running in WebWorker.
 *
 * @category Utility
 */
export function isWebWorker(): boolean {
  return (
    typeof self === "object" &&
    self.constructor &&
    self.constructor.name === "DedicatedWorkerGlobalScope"
  );
}

/**
 * Checks if currently running in a Node.js environment.
 *
 * @returns `true` if the program is running in Node.js.
 *
 * @category Utility
 */
export function isNode(): boolean {
  // For Electron:
  if (typeof process !== "undefined" && "type" in process) {
    // It is so weird that Electron calls the main process "browser":
    return process.type === "browser" || process.type === "utility";
  }

  return typeof window === "undefined" && typeof process !== "undefined";
}

/**
 * Checks if currently running in a Deno environment.
 *
 * @returns `true` if the program is running in Deno.
 *
 * @category Utility
 */
export function isDeno(): boolean {
  return (
    // @ts-expect-error
    typeof Deno !== "undefined" &&
    // @ts-expect-error
    typeof Deno.version !== "undefined" &&
    // @ts-expect-error
    typeof Deno.version.deno !== "undefined"
  );
}

/**
 * Checks if currently running in a Bun environment.
 *
 * Taken from [Bun documentation](https://bun.sh/guides/util/detect-bun).
 *
 * @returns `true` if the program is running in Bun.
 *
 * @category Utility
 */
export function isBun(): boolean {
  return typeof process !== "undefined" && isNotNil(process.versions?.bun);
}

/**
 * Checks if currently running in JSDOM environment. This is useful for
 * testing.
 *
 * Taken from [JSDOM GitHub issue](https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327).
 *
 * @returns `true` if the program is running in JSDOM.
 *
 * @category Utility
 */
export function isJSDOM(): boolean {
  if (typeof window !== "undefined" && window.name === "nodejs") {
    return true;
  }

  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator?.userAgent ?? "";

  return /Node\.js|jsdom/.test(userAgent);
}

type Runtime = "browser" | "node";

/**
 * Checks if the program is running in the specified `runtime`.
 *
 * @param runtime Runtime environment to check for.
 *
 * @returns `true` if the program is running in the specified `runtime`.
 *
 * @category Utility
 *
 * @deprecated Use {@linkcode runtime} functions instead.
 */
export function isRunningIn(runtime: Runtime): boolean {
  switch (runtime) {
    case "browser": {
      return typeof window !== "undefined" || typeof self !== "undefined";
    }

    case "node": {
      return typeof window === "undefined" && typeof process !== "undefined";
    }

    default:
      throw new Error(`Invalid runtime ${runtime} specified`);
  }
}
