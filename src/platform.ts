// noinspection JSDeprecatedSymbols

/**
 * Possible platforms for the host. Note that Linux encompasses several different
 * distros. But for the purposes of this library, we only need to know the
 * specific OS distro.
 *
 * @category Platform
 */
export type Platform = "unknown" | "linux" | "mac" | "windows";

// We cache this, so we only have to check the platform once:
let currentPlatform: Platform = "unknown";

/**
 * Gets the current OS/platform that the application is running on.
 *
 * @returns The host platform.
 *
 * @category Platform
 */
export const getPlatform = (): Platform => {
  // Check if the platform has already been cached first. If it was, return it!
  if (currentPlatform !== "unknown") {
    return currentPlatform;
  }

  if (typeof navigator !== "undefined") {
    const anyNavigator = navigator as any;

    // navigator.userAgentData.platform is the 2022 way of detecting.
    // Note that this userAgentData feature is available only in secure contexts (HTTPS):
    const platformString =
      anyNavigator?.userAgentData?.platform ?? anyNavigator?.platform ?? "";

    currentPlatform = parsePlatform(platformString);
  }

  // Usable from Node.js:
  if (typeof process !== "undefined") {
    currentPlatform = parsePlatform(process.platform);
  }

  return currentPlatform;
};

/**
 * Checks if the specified platform matches the host.
 *
 * @param platform Platform to check against the host.
 *
 * @returns `true` if the specified `platform` matches the host.
 *
 * @category Platform
 */
export const isPlatform = (platform: Platform): boolean =>
  getPlatform() === platform;

/**
 * Caches the platform, so it doesn't need to be checked on every call to
 * {@linkcode getPlatform} and returns the current platform.
 *
 * @returns The current host {@linkcode Platform}.
 *
 * @category Platform
 */
export const cachePlatform = (): Platform => {
  if (currentPlatform === "unknown") {
    currentPlatform = getPlatform();
  }

  return currentPlatform;
};

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
