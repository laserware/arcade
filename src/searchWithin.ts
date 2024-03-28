import type { AnyDict } from "./types.js";

/**
 * Returns an array of values in which the field name value matches the
 * specified search term in the specified collection.
 * @param collection Values to search.
 * @param searchTerm Search term to match.
 * @param fieldName Field name in the collection to search.
 */
export function searchWithin<T extends AnyDict>(
  collection: T[],
  searchTerm: string,
  fieldName: string,
): T[] {
  return collection.filter((value) =>
    value[fieldName].toLowerCase().includes(searchTerm.toLowerCase()),
  );
}
