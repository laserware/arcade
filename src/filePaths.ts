import { isPlatform } from "./platform.js";

/**
 * Joins the specified file `pathElements` based on the host platform path
 * separator.
 *
 * @param pathElements Path elements to join.
 *
 * @returns Full path from the joined path elements.
 *
 * @category File System
 */
export function joinFilePath(...pathElements: string[]): string {
  const separator = isPlatform("windows") ? "\\" : "/";

  return pathElements.join(separator);
}

/**
 * Splits the specified `filePath` into separate elements based on the host
 * platform path separator.
 *
 * @param filePath File path to split.
 *
 * @returns Array of path elements.
 *
 * @category File System
 */
export function splitFilePath(filePath: string): string[] {
  const separator = isPlatform("windows") ? "\\" : "/";

  return filePath.split(separator).filter(Boolean);
}
