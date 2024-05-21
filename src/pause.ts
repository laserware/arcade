/**
 * Pauses execution for the specified duration.
 *
 * @param duration Duration (in milliseconds) to pause for.
 */
export function pause(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
