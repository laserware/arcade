import { getPlatform, Platform } from "./platform.js";

/**
 * Joins the specified file path elements and returns the full path.
 *
 * @param pathElements Path elements to join.
 * @returns Full path from the joined path elements.
 */
export function joinFilePath(...pathElements: string[]): string {
  const separator = getPlatform() === Platform.Windows ? "\\" : "/";

  return pathElements.join(separator);
}

/**
 * Splits the specified file path and returns the path elements.
 *
 * @param filePath File path to split.
 * @returns Array of path elements.
 */
export function splitFilePath(filePath: string): string[] {
  const separator = getPlatform() === Platform.Windows ? "\\" : "/";

  return filePath.split(separator);
}
