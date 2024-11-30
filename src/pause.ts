/**
 * Pauses execution for the specified duration.
 *
 * @param duration Duration (in milliseconds) to pause for.
 *
 * @category Utility
 */
export function pause(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
