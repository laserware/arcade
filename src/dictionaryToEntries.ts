/**
 * Returns an array of [key, value] pairs for the specified dictionary.
 * The purpose of this function is to allow an override for the type of the
 * object key since TypeScript defaults to only allowing a string (but it
 * could be a string enum).
 * @param dictionary Dictionary to convert to entries
 */
export function dictionaryToEntries<TValue, TKey = string>(
  dictionary: Record<string, TValue>,
): [TKey, TValue][] {
  const entries = Object.entries(dictionary);

  return entries as [TKey, TValue][];
}
