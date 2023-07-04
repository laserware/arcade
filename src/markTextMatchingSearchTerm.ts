/**
 * Returns an updated string with marked text for search results.
 * @param haystack String to search
 * @param needle Search term to match
 */
export function markTextMatchingSearchTerm(
  haystack: string,
  needle: string,
): string {
  if (needle === "") {
    return haystack;
  }

  try {
    const results = new RegExp(needle, "ig").exec(haystack);
    if (results === null) {
      return haystack;
    }

    const highlighted = results[0];

    const replaceRegex = new RegExp(highlighted, "g");

    return haystack.replace(replaceRegex, `<mark>${highlighted}</mark>`);
  } catch {
    return haystack;
  }
}
