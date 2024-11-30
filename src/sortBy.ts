/**
 * Sorts the specified `items` by the specified `field`.
 *
 * @template T Type of item in the specified `items` array.
 *
 * @param items Items to sort.
 * @param field Field to sort by.
 *
 * @returns Values sorted by the specified `field`.
 *
 * @category Array
 */
export function sortBy<T>(items: T[], field: string): T[] {
  if (items.length < 2) {
    return items;
  }

  const [firstRecord] = items;

  const key = field as keyof typeof firstRecord;

  if (typeof firstRecord[key] === "string") {
    return items.toSorted((a, z) =>
      (a[key] as string).localeCompare(z[key] as string),
    );
  } else {
    return items.toSorted((a, z) => (a[key] as number) - (z[key] as number));
  }
}
