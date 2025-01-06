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

import { isNotNil } from "./isNotNil.js";

/**
 * Runtime environment in which the code is executing.
 *
 * @category Runtime
 */
export type Runtime = "browser" | "bun" | "deno" | "node" | "worker";

// We cache the runtime on the first lookup since we only need to perform the
// check once:
let cachedRuntime: Runtime | null = null;

/**
 * Checks if the specified `runtime` matches the host.
 *
 * @param runtime Runtime to check against the host.
 *
 * @returns `true` if the specified `runtime` matches the host.
 *
 * @category Runtime
 */
export function isRuntime(runtime: Runtime): boolean {
  return getRuntime() === runtime;
}

/**
 * Gets the current JavaScript runtime in which the application is running.
 *
 * @returns The JavaScript runtime.
 *
 * @category Runtime
 */
export function getRuntime(): Runtime {
  if (cachedRuntime !== null) {
    return cachedRuntime;
  }

  if (
    typeof self === "object" &&
    self.constructor &&
    self.constructor.name === "DedicatedWorkerGlobalScope"
  ) {
    return setCachedRuntime("worker");
  }

  if (typeof window !== "undefined") {
    return setCachedRuntime("browser");
  }

  // @ts-ignore
  if (typeof Deno !== "undefined" && isNotNil(Deno?.version?.deno)) {
    return setCachedRuntime("deno");
  }

  if (typeof process !== "undefined") {
    /**
     * Checks if currently running in a Bun environment.
     * Taken from [Bun documentation](https://bun.sh/guides/util/detect-bun).
     */
    if (isNotNil(process.versions?.bun)) {
      return setCachedRuntime("bun");
    }

    /**
     * Electron has a `process` object available in global scope in the browser
     * (i.e. "renderer") process, so we need to run an extra check to get the
     * correct runtime.
     */
    if ("type" in process && isNotNil(process.versions?.electron)) {
      if (process.type === "worker") {
        return setCachedRuntime("worker");
      } else if (process.type === "renderer") {
        return setCachedRuntime("browser");
      } else {
        return setCachedRuntime("node");
      }
    }

    // Fall back to Node, since the browser shouldn't have a `process` object
    // available in global scope:
    return setCachedRuntime("node");
  }

  throw new Error("Unable to get runtime");
}

function setCachedRuntime(runtime: Runtime): Runtime {
  cachedRuntime = runtime;

  return runtime;
}

/**
 * Checks if the program is running in the specified `runtime`.
 *
 * @param runtimeFor Runtime environment to check for.
 *
 * @returns `true` if the program is running in the specified `runtime`.
 *
 * @category Runtime
 *
 * @deprecated Use {@linkcode isRuntime} instead.
 */
export function isRunningIn(runtimeFor: "browser" | "node"): boolean {
  switch (runtimeFor) {
    case "browser": {
      return typeof window !== "undefined" || typeof self !== "undefined";
    }

    case "node": {
      return typeof window === "undefined" && typeof process !== "undefined";
    }

    default:
      throw new Error(`Invalid runtime ${runtimeFor} specified`);
  }
}
