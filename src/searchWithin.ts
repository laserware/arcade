import { isNil } from "./isNil.js";
import type { AnyDict } from "./types.js";

/**
 * Returns an array of values in which the specified `fieldName` value matches the
 * specified `searchTerm` in the specified `collection`.
 *
 * @param collection Values to search.
 * @param searchTerm Search term to match.
 * @param fieldName Field name in the collection to search.
 *
 * @returns Array of matching entries in the specified `collection`.
 *
 * @category Collection
 */
export function searchWithin<T extends AnyDict>(
  collection: T[],
  searchTerm: string,
  fieldName: string,
): T[] {
  return collection.filter((value) => {
    if (isNil(value[fieldName])) {
      return false;
    }

    return value[fieldName].toLowerCase().includes(searchTerm.toLowerCase());
  });
}
