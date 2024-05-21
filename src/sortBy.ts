import { toSorted } from "./toSorted.js";

/**
 * Sorts the specified values by the specified field and returns the sorted
 * result.
 *
 * @param values Values to sort.
 * @param field Field to sort by.
 */
export function sortBy<T>(values: T[], field: string): T[] {
  if (values.length < 2) {
    return values;
  }

  const [firstRecord] = values;

  const key = field as keyof typeof firstRecord;

  if (typeof firstRecord[key] === "string") {
    return toSorted<T>(values, (a, z) =>
      (a[key] as string).localeCompare(z[key] as string),
    );
  } else {
    return toSorted<T>(
      values,
      (a, z) => (a[key] as number) - (z[key] as number),
    );
  }
}
