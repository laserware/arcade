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
 * Contains functions for checking the current runtime environment that the
 * code is executing in.
 *
 * @example
 * import { runtime } from "@laserware/arcade";
 *
 * function getUuid(): string {
 *   let id: string;
 *
 *   if (runtime.isBrowser()) {
 *     id = window.crypto.randomUUID();
 *   } else if (runtime.isNode()) {
 *     id = require("node:crypto").randomUUID();
 *   }
 *
 *   return id;
 * }
 *
 * function doThingInEnv(): void {
 *   switch (runtime.get()) {
 *     case "browser":
 *       return console.log("Browser!");
 *
 *     case "worker":
 *       return console.log("WebWorker!");
 *
 *     case "node":
 *       return console.log("Node!");
 *
 *     default:
 *       break;
 *   }
 * }
 *
 * @category Utility
 */
export namespace runtime {
  const cache = new Map<Runtime, boolean>();

  /**
   * Runtime environment in which the code is executing.
   *
   * @category Utility
   */
  export type Runtime =
    | "browser"
    | "bun"
    | "deno"
    | "jsdom"
    | "node"
    | "worker";

  /**
   * Returns the current runtime environment.
   *
   * @category Utility
   */
  export function get(): Runtime {
    switch (true) {
      case isBrowser():
        return "browser";

      case isWebWorker():
        return "worker";

      case isJSDOM():
        return "jsdom";

      case isNode():
        return "node";

      case isBun():
        return "bun";

      case isDeno():
        return "deno";

      default:
        throw new Error("Unable to determine runtime");
    }
  }

  /**
   * Checks if currently running in a browser environment.
   *
   * @returns `true` if the program is running in browser.
   *
   * @category Utility
   */
  export function isBrowser(): boolean {
    const entry = asCacheEntry("browser");

    if (entry.exists()) {
      return entry.value();
    }

    // For Electron:
    if (typeof process !== "undefined" && "type" in process) {
      return entry.set(process.type === "renderer");
    }

    return entry.set(typeof window !== "undefined");
  }

  /**
   * Checks if currently running in a WebWorker environment.
   *
   * @returns `true` if the program is running in WebWorker.
   *
   * @category Utility
   */
  export function isWebWorker(): boolean {
    const entry = asCacheEntry("worker");

    if (entry.exists()) {
      return entry.value();
    }

    return entry.set(
      typeof self === "object" &&
        self.constructor &&
        self.constructor.name === "DedicatedWorkerGlobalScope",
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
    const entry = asCacheEntry("node");

    if (entry.exists()) {
      return entry.value();
    }

    // For Electron:
    if (typeof process !== "undefined" && "type" in process) {
      // It is so weird that Electron calls the main process "browser":
      // prettier-ignore
      return entry.set(process.type === "browser" || process.type === "utility");
    }

    // prettier-ignore
    return entry.set(typeof window === "undefined" && typeof process !== "undefined");
  }

  /**
   * Checks if currently running in a Deno environment.
   *
   * @returns `true` if the program is running in Deno.
   *
   * @category Utility
   */
  export function isDeno(): boolean {
    const entry = asCacheEntry("deno");

    if (entry.exists()) {
      return entry.value();
    }

    // @ts-expect-error
    // prettier-ignore
    return entry.set(typeof Deno !== "undefined" && isNotNil(Deno?.version?.deno));
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
    const entry = asCacheEntry("bun");

    if (entry.exists()) {
      return entry.value();
    }

    // prettier-ignore
    return entry.set(typeof process !== "undefined" && isNotNil(process.versions?.bun));
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
    const entry = asCacheEntry("jsdom");

    if (entry.exists()) {
      return entry.value();
    }

    if (typeof window !== "undefined" && window.name === "nodejs") {
      return entry.set(true);
    }

    if (typeof navigator === "undefined") {
      return entry.set(false);
    }

    const userAgent = navigator?.userAgent ?? "";

    return entry.set(/Node\.js|jsdom/.test(userAgent));
  }

  /**
   * Wrapper around cached runtime entries from the cache map.
   *
   * @internal
   */
  interface CacheEntry {
    /** Returns true if the entry exists in the cache. */
    exists(): boolean;
    /** Value of the cache entry. */
    value(): boolean;
    /** Updates value of cache entry. */
    set(value: boolean): boolean;
  }

  function asCacheEntry(runtime: Runtime): CacheEntry {
    return {
      exists(): boolean {
        return cache.has(runtime);
      },
      value(): boolean {
        return cache.get(runtime)!;
      },
      set(value: boolean): boolean {
        cache.set(runtime, value);

        return value;
      },
    };
  }
}

/**
 * Checks if the program is running in the specified `runtime`.
 *
 * @param runtimeFor Runtime environment to check for.
 *
 * @returns `true` if the program is running in the specified `runtime`.
 *
 * @category Utility
 *
 * @deprecated Use {@linkcode runtime} functions instead.
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