import { getPlatform, Platform } from "./platform.js";

/**
 * Joins the specified path elements and returns the full path.
 * @param pathElements Path elements to join
 */
export function joinPath(...pathElements: string[]): string {
  const separator = getPlatform() === Platform.Windows ? "\\" : "/";

  return pathElements.join(separator);
}
