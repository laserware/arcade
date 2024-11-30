/**
 * Sorts the specified `values` by the specified `field`.
 *
 * @param values Values to sort.
 * @param field Field to sort by.
 *
 * @returns Values sorted by the specified `field`.
 *
 * @category Array
 */
export const sortBy = <T>(values: T[], field: string): T[] => {
  if (values.length < 2) {
    return values;
  }

  const [firstRecord] = values;

  const key = field as keyof typeof firstRecord;

  if (typeof firstRecord[key] === "string") {
    return values.toSorted((a, z) =>
      (a[key] as string).localeCompare(z[key] as string),
    );
  } else {
    return values.toSorted((a, z) => (a[key] as number) - (z[key] as number));
  }
};
