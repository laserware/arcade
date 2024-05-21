// noinspection JSDeprecatedSymbols

/**
 * Possible platforms for the host. Note that Linux encompasses several different
 * distros. But for the purposes of this library, we only need to know the
 * specific OS distro.
 */
export enum Platform {
  Unknown,
  Linux,
  Mac,
  Windows,
}

// We cache this, so we only have to check the platform once:
let currentPlatform = Platform.Unknown;

/**
 * Caches the platform, so it doesn't need to be checked on every call to
 * {@link getPlatform} and returns the current platform.
 */
export function cachePlatform(): Platform {
  if (currentPlatform === Platform.Unknown) {
    currentPlatform = getPlatform();
  }

  return currentPlatform;
}

/**
 * Returns the current OS/platform that the application is running on.
 */
export function getPlatform(): Platform {
  // Check if the platform has already been cached first. If it was, return it!
  if (currentPlatform !== Platform.Unknown) {
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
}

/**
 * Parses the platform string and returns the appropriate Platform enum.
 *
 * @param platformString String value to extract platform from.
 */
function parsePlatform(platformString: string): Platform {
  switch (true) {
    case /mac|darwin/gi.test(platformString):
      return Platform.Mac;

    case /win/gi.test(platformString):
      return Platform.Windows;

    // Fallback to Linux (rather than unknown), since the application will never
    // run on Android or iOS:
    default:
      return Platform.Linux;
  }
}
