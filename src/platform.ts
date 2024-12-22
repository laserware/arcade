/* istanbul ignore file -- @preserve: This file is super hard to test because we're using global built-ins. */
// noinspection JSDeprecatedSymbols

import { isRuntime } from "./runtime.js";

/**
 * Possible platforms for the host. Note that Linux encompasses several different
 * distros. But for the purposes of this library, we only need to know the
 * specific OS distro.
 *
 * @category Platform
 */
export type Platform = "unknown" | "linux" | "mac" | "windows";

// We cache this, so we only have to check the platform once:
let cachedPlatform: Platform = "unknown";

/**
 * Gets the current OS/platform that the application is running on.
 *
 * @returns The host platform.
 *
 * @category Platform
 */
export function getPlatform(): Platform {
  // Check if the platform has already been cached first. If it was, return it!
  if (cachedPlatform !== "unknown") {
    return cachedPlatform;
  }

  if (isRuntime("browser")) {
    const anyNavigator = navigator as any;

    // navigator.userAgentData.platform is the 2022 way of detecting.
    // Note that this userAgentData feature is available only in secure contexts (HTTPS):
    const platformString =
      anyNavigator?.userAgentData?.platform ?? anyNavigator?.platform ?? "";

    cachedPlatform = parsePlatform(platformString);

    return cachedPlatform;
  }

  // Usable from Node.js:
  if (isRuntime("node")) {
    cachedPlatform = parsePlatform(process.platform);

    return cachedPlatform;
  }

  return "unknown";
}

/**
 * Checks if the specified `platform` matches the host.
 *
 * @param platform Platform to check against the host.
 *
 * @returns `true` if the specified `platform` matches the host.
 *
 * @category Platform
 */
export function isPlatform(platform: Platform): boolean {
  return getPlatform() === platform;
}

/**
 * Parses the platform string and returns the appropriate Platform enum.
 *
 * @param platformString String value to extract platform from.
 */
function parsePlatform(platformString: string): Platform {
  switch (true) {
    case /mac|darwin/gi.test(platformString):
      return "mac";

    case /win/gi.test(platformString):
      return "windows";

    // Fallback to Linux (rather than unknown), since the application will never
    // run on Android or iOS:
    default:
      return "linux";
  }
}
