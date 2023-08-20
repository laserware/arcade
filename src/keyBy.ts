import type { Dict } from "./types.js";

/**
 * Converts a collection of objects to keyed by the specified field name.
 * @param values Array of objects
 * @param keyField Field to key by
 * @example
 *   const result = keyBy({ id: "a", value: 1 }, { id: "b", value: 2 }, "id");
 *   > { a: { id: "a", value: 1 }, b: { id: "b", value: 2 } }
 */
export function keyBy<T>(values: T[], keyField: string): Dict<T> {
  const keyedValues = values as (T & { [keyField: string]: unknown })[];
  const valueCount = keyedValues.length;

  const dict: Dict<T> = {};

  // Using an old-school for loop here to make it snappy. Using the `reduce`
  // method allocates extra arrays:
  for (let index = 0; index < valueCount; index++) {
    const value = keyedValues[index];

    const key = value[keyField] as string;
    if (key === undefined) {
      // prettier-ignore
      throw new Error(`Unable to convert array to dictionary, key field ${keyField} not found`);
    }

    dict[key] = value;
  }

  return dict;
}
