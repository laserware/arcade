/**
 * Pauses execution for the specified duration.
 *
 * @param duration Duration (in milliseconds) to pause for.
 *
 * @category Utility
 */
export const pause = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));
