/**
 * Removes the entry associated with the specified key from the dictionary and
 * returns the updated result.
 * @param dictionary Dictionary containing entry to remove
 * @param keyToRemove Key of the entry to remove
 */
export function removeFromDictionary<T>(
  dictionary: Record<string, T>,
  keyToRemove: string,
): Record<string, T> {
  if (!(keyToRemove in dictionary)) {
    return { ...dictionary };
  }

  const updatedDictionary = {} as Record<string, T>;

  const dictionaryEntries = Object.entries(dictionary);

  for (let index = 0; index < dictionaryEntries.length; index++) {
    const [key, value] = dictionaryEntries[index];

    if (key !== keyToRemove) {
      updatedDictionary[key] = value;
    }
  }

  return updatedDictionary;
}
