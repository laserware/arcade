/**
 * Converts a collection of objects to keyed by the specified field name.
 * @param values Array of objects
 * @param keyField Field to key by
 * @example
 *   const dict = arrayToDictionary({ id: "a", value: 1 }, { id: "b", value: 2 }, "id");
 *   > { a: { id: "a", value: 1 }, b: { id: "b", value: 2 } }
 */
export function arrayToDictionary<T>(
  values: T[],
  keyField: string,
): Record<string, T> {
  const keyedValues = values as (T & { [keyField: string]: unknown })[];
  const valueCount = keyedValues.length;

  const dictionary: Record<string, T> = {};

  // Using an old-school for loop here to make it snappy. Using the `reduce`
  // method allocates extra arrays:
  for (let index = 0; index < valueCount; index++) {
    const value = keyedValues[index];

    const key = value[keyField] as string;
    if (key === undefined) {
      // prettier-ignore
      throw new Error(`Unable to convert array to dictionary, key field ${keyField} not found`);
    }

    dictionary[key] = value;
  }

  return dictionary;
}
